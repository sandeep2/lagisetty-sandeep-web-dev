var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var brcypt = require('bcrypt-nodejs');

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/auth/facebook",passport.authenticate('facebook'));
    app.get("/auth/facebook/callback",passport.authenticate('facebook',{
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignemnt/#/login'
    }));

    app.get("/api/loggedIn",loggedIn);
    app.post("/api/register",register);
    app.post("/api/logout");
    app.post("/api/login",passport.authenticate('local'),login);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID : "1825034281057848",
        clientSecret: "d7dbdf5567732677296a4a24376e6ab4",
        callbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
    };

    passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

    function localStrategy(username,passport,done){
        userModel
            .findUserByUsername(username)
            .then(function(user){
                if(user && brcypt.compareSync(password,user.password)){
                    done(null,user);
                }
                else{
                    done(null,false);
                }
            },function(error){
               done(error);
            });
    }

    function serializeUser(user,done){
        done(null,user);
    }

    function deserializeUser(user,done){
        userModel
            .findUserById(user._id)
            .then(function(user){
                done(null,user);
            },function(error){
               done(err,null);
            });
    }

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
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