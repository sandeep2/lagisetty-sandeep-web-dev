/**
 * Created by slagisetty on 6/23/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var adminModel = models.adminModel;
    
    app.get("/api/project/admin/loggedIn",loggedIn);
    app.post("/api/project/admin/register",register);
    app.post("/api/project/admin/logout",logout);
    app.post("/api/project/admin/login",passport.authenticate('admin'),login);
    app.post("/api/project/admin/", createAdmin);
    app.get("/api/project/admin/:userId", findAdminById);
    app.put("/api/project/admin/:userId", updateAdmin);
    app.delete("/api/project/admin/:userId", deleteAdmin);
    app.get("/api/project/admin", getAdmin);


    passport.use('admin', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        adminModel
            .findAdminByUsername(username)
            .then(
                function(user) {
                    if(user && password == user.password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(error) {
                    done(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    // function deserializeUser(user, done) {
    //     adminModel
    //         .findUserById(user._id)
    //         .then(
    //             function(user){
    //                 done(null, user);
    //             },
    //             function(err){
    //                 done(err, null);
    //             }
    //         );
    // }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        adminModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.status(400).send("Username already in use");
                        return;
                    }
                    else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user){
                    if(user) {
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error){
                    res.status(400).send(err);
                }
            )
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function createAdmin(req, res) {
        var newUser = req.body;

        adminModel
            .createAdmin(newUser)
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

    function deleteAdmin(req, res) {
        var id = req.params.userId;

        adminModel
            .deleteAdmin(id)
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

    function updateAdmin(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        adminModel
            .updateAdmin(id, newUser)
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


    function findAdminById(req, res) {
        var userId = req.params.userId;
        Admin
            .findAdminById(userId)
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

    function getAdmin(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findAdminByCredentials(username, password,req, res);
        } else if(username) {
            findAdminByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findAdminByCredentials(username, password,req, res) {
        adminModel
            .findAdminByCredentials(username, password)
            .then(
                function(user) {
                    req.session.currentUser = user;
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
    function findAdminByUsername(username, res) {
        adminModel
            .findAdminByUsername(username)
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
};
