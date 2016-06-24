/**
 * Created by slagisetty on 6/24/2016.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var AdminSchema = require("./admin.schema.server")();
    var Admin = mongoose.model("ProjectAdmin", AdminSchema);

    var api = {
        createAdmin: createAdmin,
        findAdminByCredentials: findAdminByCredentials,
        findAdminByUsername: findAdminByUsername,
        findAdminById: findAdminById,
        updateAdmin: updateAdmin,
        deleteAdmin: deleteAdmin
    };
    return api;


    function createAdmin(user) {
        return Admin.create(user);
        // User.create(user, function(err, user){
        //     model.find(funct(){
        //         model.find
        //     })
        // });
    }

    function findAdminById(userId) {
        return Admin.findById(userId);
    }

    function findAdminByCredentials(username, password) {
        return Admin.findOne({username: username, password: password});
    }

    function findAdminByUsername(username) {
        return Admin.findOne({username: username});
    }
    
    function updateAdmin(id, newUser) {
        return Admin.update(
            {_id: id},
            {$set :newUser
            }
        );
    }

    function deleteAdmin(userId) {
        return Admin.remove({_id: userId});
    }

};