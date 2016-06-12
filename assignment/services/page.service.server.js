/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app,models){

    var pageModel = models.pageModel;

    app.get("/api/page/:pageId",findPageById);
    app.get("/api/website/:websiteId/page",findAllPages);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function deletePage(req,res){
        var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(function(response){
                res.send(200);
            },
            function(error){
               res.sendStatus(400).send(error);
            });
    }

    function findAllPages(req,res){
        var id = req.params.websiteId;
        pageModel
            .findAllPages(id)
            .then(function(pages){
                res.send(pages);
            },
            function(error){
               res.sendStatus(400).send(error);
            });
    }

    function findPageById(req,res){
        var id = req.params.pageId;
        pageModel
            .findPageById(id)
            .then(function(page){
                res.send(page);
            },
            function(error){
               res.sendStatus(404).send(error);
            });
    }

    function updatePage(req,res){
        var page = req.body;
        var id = req.params.pageId;
        pageModel
            .updatePage(id,page)
            .then(function(response){
               res.send(200);
            },
            function(error){
                res.sendStatus(400).send(error);
            });
    }

    function createPage(req,res){
        var page = req.body;
        var id = req.params.websiteId;

        pageModel
            .createPage(id,page)
            .then(function(page){
                res.send(page);
            },
            function(error){
               res.sendStatus(400).send(error);
            });
    }


};