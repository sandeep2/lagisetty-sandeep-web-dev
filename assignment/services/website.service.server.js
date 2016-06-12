/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app,models){

    var websiteModel = models.websiteModel;
    var userModel = models.userModel;

    app.get("/api/user/:userId/website",getAllWebsites);
    app.post("/api/user/:userId/website",createWebsite);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);
    app.get("/api/website/:websiteId",getWebsiteById);

    function getAllWebsites(req,res){
        var id = req.params.userId;
        websiteModel
            .findAllWebsites(id)
            .then(function(websites){
                res.send(websites);
            },
            function(error){
               res.sendStatus(404).send(error);
            });
    }

    function createWebsite(req,res){
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .createWebsite(userId, website)
            .then(
                function (createdWebsite){
                    userModel
                        .findUserById(userId)
                        .then(function(user){
                                if (user){
                                    user.websites.push(createdWebsite._id);
                                    userModel
                                        .updateUser(userId, user)
                                        .then(function(status){
                                                res.send(createdWebsite);
                                            },
                                            function (error) {
                                                res.sendStatus(400).send(error);
                                            });
                                }
                                else{
                                    res.sendStatus(400).send(error);
                                }
                            },
                            function(error){
                                res.sendStatus(400).send(error);
                            });
                },
                function (error){
                    res.sendStatus(400).send(error);
                });
    }



    function updateWebsite(req,res){
        var website = req.body;
        var id = req.params.websiteId;
        websiteModel
            .updateWebsite(id,website)
            .then(function(response){
               res.send(200);
            },
                function(error){
                    res.sendStatus(404).send(error);
                }
            )
    }

    function deleteWebsite(req,res){
       var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function(newWebsite){
                var id = newWebsite._user;
                websiteModel
                    .deleteWebsite(newWebsite._id)
                    .then(function(response){
                        userModel
                            .findUserById(id)
                            .then(function(user){
                                    if (user){
                                        for( var i in user.websites){
                                            if(user.websites[i].equals(newWebsite._id)){
                                                user.websites.splice(i,1);
                                                userModel
                                                    .updateUser(id, user)
                                                    .then(
                                                        function(stats){
                                                            res.sendStatus(200);
                                                        },
                                                        function (error) {
                                                            res.statusCode(400).send(error);
                                                        }
                                                    );
                                            }
                                        }
                                        res.statusCode(400);
                                    }
                                else{
                                    res.sendStatus(400);
                                }
                            },
                            function(error){
                                res.sendStatus(400).send(error);
                            })
                    },
                    function(error){
                       res.sendStatus(400).send(error);
                    });
            },
            function(error){
                res.sendStatus(400).send(error);
            });





/*        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(response){
                res.send(200);
            },
            function(error){
            res.sendStatus(404).send(error);
            });*/
    }

    function getWebsiteById(req,res){
        var id = req.params.websiteId;
        websiteModel
            .findWebsiteById(id)
            .then(function(response){
                res.send(response);
            },
            function(error){
                res.sendStatus(404).send(error);
            });
    }
};