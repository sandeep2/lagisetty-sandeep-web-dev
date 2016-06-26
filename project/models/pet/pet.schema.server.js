/**
 * Created by slagisetty on 6/21/2016.
 */
module.exports = function(){
    var mangoose = require("mongoose");
    var PetSchema = mangoose.Schema({
        petId: {type: String, required: true, index: {unique: true}},
        media:[String],
        description: String,
        sex: String,
        name: String,
        age: String,
        breed: String,
        contact: String
    },{collection: "project.pet"});

    return PetSchema;
};