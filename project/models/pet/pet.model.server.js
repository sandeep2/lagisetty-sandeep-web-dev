/**
 * Created by slagisetty on 6/21/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var PetSchema = require("./pet.schema.server")();
    var Pet = mongoose.model("ProjectPet", PetSchema);

    var api = {
        createPet: createPet,
        findPetById: findPetById,
        deletePet: deletePet,
        updatePet: updatePet
    };
    return api;

    function createPet(pet) {
        return Pet.create(pet);
    }

    function findPetById(petId) {
        return Pet.findById(petId);
    }

    function updatePet(id, newPet) {
        return Pet.update(
            {petId: id},
            {
                $set: widget
            }
        );
    }
    
    function deletePet(id) {
        return Pet.remove({_id: userId});
    }
};