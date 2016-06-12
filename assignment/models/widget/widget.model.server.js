/**
 * Created by Sandeep on 6/11/2016.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var WidgetSchema =  require("./widget.schema.server")();
    var Widget = mongoose.model("Widget",WidgetSchema);

    var api = {

        createWidget: createWidget,
        findAllWidgets: findAllWidgets,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        findWidgetById: findWidgetById,
        sortWidget: sortWidget
    };

    return api;

    function sortWidget(id,start, end) {
        return Widget
            .find({_page: id}, function(err, widgets) {
                widgets.forEach(function(widget) {
                    if(start >= end) {
                        if(widget.order === start){
                            widget.order = end;
                        }
                        else if (widget.order >= end && widget.order < start){
                            widget.order = widget.order + 1;
                        }
                    }
                    else {
                        if(widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                        }
                        else if(widget.order === start) {
                            widget.order = end;
                        }
                    }
                    widget.save();
                })
            });
    }

    function createWidget(id,widget){
        widget._page = id;
        return Widget.create(widget);
    }

    function findAllWidgets(pageId){
        return Widget.find({_page:pageId});
    }

    function findWidgetById(widgetid){
        return Widget.findById(widgetid);
    }

    function deleteWidget(id){
        return Widget.remove({_id:id});
    }

    function updateWidget(id, widget){
        delete widget._id;
        return Widget.update({_id: id },{
            $set: widget
        });
    }
};