module.exports = function(){
  var mangoose = require("mongoose");
    var UserSchema = mangoose.Schema({
       username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        facebook:{
            token: String,
            id: String,
            displayName: String
        },
        dob: Date,
        dateCreated: {type: Date, default: Date.now},
        websites: [{type: mangoose.Schema.Types.ObjectId,ref: 'Website'}]
    },{collection: "assignment.user"});

    return UserSchema;
};