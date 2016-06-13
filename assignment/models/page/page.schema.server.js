/**
 * Created by Sandeep on 6/11/2016.
 */
module.exports = function(){
  var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website : {type : mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        dateCreated: {type:Date,default:Date.now},
        widgets: [{type:mongoose.Schema.ObjectId,ref: "Widget"}]
    },
        {collection: "assignment.page"});

    return PageSchema;
};