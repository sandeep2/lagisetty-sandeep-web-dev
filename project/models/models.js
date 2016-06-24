module.exports = function(){

    var models = {
        userModel: require("./user/user.model.server.js")(),
        petModel: require("./pet/pet.model.server.js")()
    };
    return models;
};