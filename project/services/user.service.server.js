/**
 * Created by slagisetty on 6/18/2016.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get('/auth/google',passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));
    app.get("/api/project/loggedIn",loggedIn);
    app.post("/api/project/register",register);
    app.post("/api/project/logout",logout);
    app.post("/api/project/login",passport.authenticate('pet'),login);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:userId", findUserById);
    app.put("/api/project/user/:userId", updateUser);
    app.delete("/api/project/user/:userId", deleteUser);
    app.post("/api/project/forgot",forgotEmail);

    var googleConfig = {
        clientID:"90027190565-pf17a3uoq1ctiksrgcf4el9inido5d2u.apps.googleusercontent.com",
        clientSecret: "X0Lvz5lL61NeZWgja06UFfRF",
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"

    };

    passport.use('pet', new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig,googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password,user.password)) {
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

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findGoogleUser(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var User = {
                            username:  email.split("@")[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(User);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
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
        // passport authenticates user by the time it reaches this code.
        // passport also stores the user in the request. So all that's left to do is return it.
        var user = req.user;
        res.json(user);
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
        if(username && password) {
            findUserByCredentials(username, password,req, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

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

    function findUserByCredentials(username, password,req, res) {
        userModel
            .findUserByCredentials(username, password)
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
};