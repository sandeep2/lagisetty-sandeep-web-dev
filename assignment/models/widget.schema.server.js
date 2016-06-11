/**
 * Created by Sandeep on 6/10/2016.
 */
module.exports = function(){
  var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page:{type: mongoose.Schema.types.ObjectId, ref: 'Page'},
        type:{type: String}
    })
};