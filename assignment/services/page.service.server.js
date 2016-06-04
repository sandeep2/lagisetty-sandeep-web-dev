/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app){
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.get("/api/page/:pageId",findPageById);
    app.get("/api/website/:websiteId/page",findAllPages);
    app.post("/api/website/:websiteId/page",createPage);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function deletePage(req,res){
        var id = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === id){
                pages.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function findAllPages(req,res){
        var id = req.params.websiteId;
        var result = [];
        for (var i in pages){
            if(pages[i].websiteId === id){
                result.push(pages[i]);
            }
        }
        res.send(result);
    }

    function findPageById(req,res){
        var id = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === id){
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function updatePage(req,res){
        var page = req.body;
        var id = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === id){
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function createPage(req,res){
        var page = req.body;
        page._id = (new Date()).getTime()+"";
        pages.push(page);
        res.send(page);
    }

};