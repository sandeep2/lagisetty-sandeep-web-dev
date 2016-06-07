module.exports = function(){

    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/MyAssignment");

    var models = {
        userModel: require("./user/user.model.server.js")()
    };
    return models;
};