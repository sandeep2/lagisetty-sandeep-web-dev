/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app){
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
        var result = [];
        for ( var i in websites){
            if (websites[i].developerId === id){
                result.push(websites[i])
            }
        }
        res.json(result);
    }

    function createWebsite(req,res){
        var website = req.body;
        website._id = (new Date()).getTime()+"";
        websites.push(website);
        res.send(200);
    }

    function updateWebsite(req,res){
        var website = req.body;
        var id = req.params.websiteId;

        for ( var i in websites){
            if(websites[i]._id === id){
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWebsite(req,res){
        var id = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === id){
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }

        res.send(404);
    }

    function getWebsiteById(req,res){
        var id = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === id){
                res.send(websites[i]);
                return;
            }
        }
        res.send(400);
    }

}