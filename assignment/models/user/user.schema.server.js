module.exports = function(){
  var mangoose = require("mongoose");
    var UserSchema = mangoose.Schema({
       username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        dob: Date,
        dateCreated: {type: Date, default: Date.now}
    },{collection: "assignment.user"});

    return UserSchema;
};