/**
 * Created by slagisetty on 6/18/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            register: register,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserPresent: findUserPresent,
            findUserByEmail: findUserByEmail,
            likePets: likePets
        };
        return api;

        function loggedIn(){
            return $http.get("/api/project/loggedIn");
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login",user);
        }

        function register(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/register",user);
        }

        function findUserPresent(username){
            var url = "/api/project/user/?username=" + username;
            return $http.get(url);
        }
        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/user", user);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/project/user/" + id;
            return $http.put(url, newUser);
        }

        function likePets (id,pet){
            var url = "/api/project/like/"+id;
            return $http.put(url,pet);
        }
        
        function findUserById(id) {
            var url = "/api/project/user/" + id;
            return $http.get(url);
        }

        function findUserByEmail(email) {
            var forgotEmail = {
                email: email
            };
            var url = "/api/project/forgot";
            return $http.post(url,forgotEmail);
        }
        
        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

    }
})();