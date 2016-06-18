/**
 * Created by slagisetty on 6/18/2016.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.post("/api/project/forgot",forgotEmail)

    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.whereismypet@gmail.com', // my mail
            pass: 'Whatiswhat1'
        }
    }));
    
    function forgotEmail(req,res){
        var forgotUser = req.body;
        userModel
            .findUserByEmail(forgotUser.email)
            .then(function (response) {
                if(response === null){
                    console.log(response);
                    res.send(response);
                }
                else{
                    transport.sendMail({
                        from: "noreply.whereismypet", // sender address
                        to: forgotUser.email, // comma separated list of receivers
                        subject: "Password ✔", // Subject line
                        text: "The password for your account is :" + response.password// plaintext body
                    },function(error,response){
                        if(error)
                        {
                            res.send(error);
                        }
                        else {
                            res.send("True");
                        }
                        });
                    }

            },function(error){
                res.send(error);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
        // for(var i in users) {
        //     if(users[i].username === newUser.username) {
        //         res.status(400).send("Username " + newUser.username + " is already in use");
        //         return;
        //     }
        // }
        //
        // newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        // res.json(newUser);
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );

        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(404).send("Unable to remove user with ID: " + id);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(200);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
        // for(var i in users) {
        //     if(users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.status(400).send("User with ID: "+ id +" not found");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
        // for(var i in users) {
        //     if(userId === users[i]._id) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        var email = req.query["email"];
        if(email){
            findUserByEmail(email,res);
        }
        else if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(403).send("Unable to login");
                }
            );
        // for(var u in users) {
        //     if(users[u].username === username && users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send(403);
    }
    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(function(response){
                    if (response === null){
                        res.send(response);
                    }
                    else{
                        res.send("True");
                    }
                },
                function(error){
                    res.send(error);
                });
    }
    
    function findUserByEmail(email,res){
        userModel
            .findUserByEmail(email)
            .then(function (response) {
                if(response === null){
                    res.send(response);
                } else{
                    res.send("True");
                }
            },function (error) {
                res.send(error);
            });
    }
};