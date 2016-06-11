/**
 * Created by Sandeep on 6/11/2016.
 */
var mongoose = require("mongoose");

module.exports = function(){
  var WidgetSchema = mongoose.Schema({
      _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
      type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
      name: String,
      text: String,
      description: String,
      placeHolder: String,
      url: String,
      width: String,
      height: String,
      rows: String,
      size: String,
      class: String,
      icon: String,
      deleteable: String,
      formatted: String,
      dateCreated: {type: Date, default: Date.now}},
      {collection: "assignment.widget"});

    return WidgetSchema;
  };