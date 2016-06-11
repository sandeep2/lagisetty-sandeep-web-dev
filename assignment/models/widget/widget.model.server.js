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
        findWidgetById: findWidgetById
    };

    return api;

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
        return Widget.update(
            {_id:id},
            {$set: {
                name:widget.name || '',
                text: widget.text || '',
                description: widget.description || '',
                placeholder: widget.description || '',
                url: widget.url || '',
                width: widget.width || '',
                height: widget.height || '',
                rows: widget.rows || 1,
                size: widget.size || 1,
                class: widget.class || '',
                icon: widget.icon || '',
                deletable: widget.deletable || false,
                formatted: widget.formatted || false
            }}
        );
    }
};