(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService() {
        var api = {
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserInstance: findUserInstance,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserPresent: findUserPresent
        };
        return api;

        function findUserPresent(username)
        {
            for(var i in users) {
                if (users[i].username === username) {
                    return true;
                }
            }
                    return false;

        }
        function createUser(username,password) {
            var registerUser = {
                _id:(new Date()).getTime()+"",
                username:username,
                password:password
            };
            users.push(registerUser);
            console.log(registerUser);
            return registerUser;
        }

        function deleteUser(userId) {
            for(var i in users){
                if(users[i]._id=== userId)
                {users.splice(i,1)};
            }
        }
        function updateUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].email = newUser.email;
                    console.log(users[i]);
                    return true;
                }
            }
            return false;
        }

        function findUserInstance(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }
    }
})();