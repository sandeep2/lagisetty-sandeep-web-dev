/**
 * Created by slagisetty on 6/3/2016.
 */
module.exports = function(app){
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget",createWidget);
    app.put("/api/widget/:widgetId",updateWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.get("/api/page/:pageId/widget",findAllWidgets);
    app.delete("/api/widget/:widgetId",deleteWidget);

    function findAllWidgets(req,res){
        result = []
        var pageId = req.params.pageId;

        for (var i in widgets){
            if(widgets[i].pageId === pageId){
                result.push(widgets[i]);
            }
        }
        res.send(result);
    }

    function  createWidget(req,res){
        var widget = req.body;
        widget._id = (new Date()).getTime()+"";
        widgets.push(widget);
        res.status(200).send(widget._id);
    }

    function updateWidget(req,res){
        var widget = req.body;
        var id = req.params.widgetId;

        for ( var i in widgets){
            if(widgets[i]._id === id){
                widgets[i] = widget;
                res.send(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req,res){
        var id = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === id){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function  findWidgetById(req,res){
        var id = req.params.widgetId;
        for ( var i in widgets){
            if(widgets[i]._id === id){
                res.send(widgets[i]);
                return;
            }
        }
        res.sendStatus(400);
    }

};