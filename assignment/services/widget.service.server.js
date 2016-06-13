/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app,models){

    var widgetModel = models.widgetModel;
    var multer = require('multer');
    var upload = multer({dest: __dirname+'/../../public/uploads'});

    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.get("/api/page/:pageId/widget",findAllWidgets);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/upload",upload.single('myFile'),uploadImage);
    app.put("/api/page/:pageId/widget",sortWidget);

    function uploadImage(req,res){

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widget_url = "/assignment/index.html#/user/"+ userId +"/website/"+ websiteId +"/page/"+ pageId +"/widget/" + widgetId;

        if(myFile == null){
            res.redirect(widget_url);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = {url: "/uploads/" + filename};
        widgetModel
            .updateWidget(widgetId,widget)
            .then(function(response){
                res.send(200);
            },function(error){
               res.sendStatus(400).send(error);
            });
        res.redirect("/assignment/#/user/"+userId +"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
/*        for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i].url = "/uploads/"+filename;
            }
        }
        res.redirect(widget_url);*/
    }

    function findAllWidgets(req,res){
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgets(pageId)
            .then(function(widgets){
                res.send(widgets);
            },function(error){
                res.send(error);
            });
/*        result = []
        var pageId = req.params.pageId;

        for (var i in widgets){
            if(widgets[i].pageId === pageId){
                result.push(widgets[i]);
            }
        }
        res.send(result);*/
    }

    function sortWidget(req,res){
        var id = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);

        widgetModel
            .sortWidget(id,start,end)
            .then(function(widget){
                res.sendStatus(200);
            },
            function(error){
                res.sendStatus(400).send(error);
            })
    }

    function  createWidget(req,res){
        var widget = req.body;
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgets(pageId)
            .then(function(listWidgets){

                widget.order = listWidgets.length;
                widgetModel
                .createWidget(pageId,widget)
                    .then(function(widget){
                        res.send(widget);
                    },function(error){
                        res.sendStatus(404).send(error);
                    });
            },
            function(error){
                res.send(404).send(error);
            });
/*        widget._id = (new Date()).getTime()+"";
        widgets.push(widget);
        res.status(200).send(widget._id);*/
    }

    function updateWidget(req,res){
        var widget = req.body;
        var id = req.params.widgetId;

        widgetModel
            .updateWidget(id,widget)
            .then(function(response){
                res.sendStatus(200);
            }, function (error) {
                console.log(error);
                res.sendStatus(400).send(error);
            })
    }

    function deleteWidget(req,res){
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(function(response){
                res.send(200);
            },function(error){
                res.sendStatus(400).send(error);
            });
/*        for(var i in widgets){
            if(widgets[i]._id === id){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);*/
    }

    function  findWidgetById(req,res){
        var id = req.params.widgetId;
        widgetModel
            .findWidgetById(id)
            .then(function(widget){
                res.send(widget);
            },function(error){
                res.sendStatus(400).send(error);
            });
/*        for ( var i in widgets){
            if(widgets[i]._id === id){
                res.send(widgets[i]);
                return;
            }
        }
        res.sendStatus(400);*/
    }

};