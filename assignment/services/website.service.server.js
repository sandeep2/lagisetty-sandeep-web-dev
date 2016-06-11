/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app,models){

    var websiteModel = models.websiteModel;

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

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
        var website = req.body;
        var userId = req.params.userId;

        websiteModel
            .createWebsite(userId,website)
            .then(function(website){
                res.send(website);
            },
            function(error){
               res.sendStatus(404).send(error);
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
            .deleteWebsite(websiteId)
            .then(
                function(response){
                res.send(200);
            },
            function(error){
            res.sendStatus(404).send(error);
            });
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