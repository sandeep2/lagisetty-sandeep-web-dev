module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserByEmail: findUserByEmail,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findGoogleUser:findGoogleUser,
        findAllUsers: findAllUsers,
        findAllLikes: findAllLikes
    };
    return api;

    function findAllLikes(id) {
        users = User.find({favorites:{$elemMatch:{$in:[id]}}});
        return users;
    }

    function findAllUsers(){
        return User.find();
    }
    
    function findGoogleUser(id) {
        return User.findOne({'google.id':id})
    }
    function createUser(user) {
        return User.create(user);
        // User.create(user, function(err, user){
        //     model.find(funct(){
        //         model.find
        //     })
        // });
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function findUserByEmail(email) {
        return User.findOne({email:email});
    }

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},
            {$set :
            {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                favorites: newUser.favorites,
                password: newUser.password
            }
            }
        );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

};