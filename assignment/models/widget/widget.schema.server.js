/**
 * Created by Sandeep on 6/11/2016.
 */
var mongoose = require("mongoose");

module.exports = function(){
  var WidgetSchema = mongoose.Schema({
      _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
      type: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
      name: String,
      text: String,
      description: String,
      placeHolder: String,
      url: String,
      width: String,
      height: String,
      rows: Number,
      size: Number,
      class: String,
      icon: String,
      deleteable: Boolean,
      formatted: Boolean,
      dateCreated: {type: Date, default: Date.now},
      order: Number},
      {collection: "assignment.widget"});

    return WidgetSchema;
  };