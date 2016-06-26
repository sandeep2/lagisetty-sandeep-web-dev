module.exports = function(){
  var mangoose = require("mongoose");
    var UserSchema = mangoose.Schema({
       username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dob: Date,
        dateCreated: {type: Date, default: Date.now},
        favorites:[String],
        google:{
            id: String,
            token: String
        }
    },{collection: "project.user"});

    return UserSchema;
};