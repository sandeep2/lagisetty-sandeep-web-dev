(function(){
    angular
        .module("WebAppMaker")
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
            findUserPresent: findUserPresent
        };
        return api;

        function loggedIn(){
            return $http.get("/api/loggedIn");
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function login(username,password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login",user);
        }

        function register(username,password){
            var user = {
              username: username,
                password: password
            };
            return $http.post("/api/register",user);
        }

        function findUserPresent(username){
            var url = "/api/user/?username=" + username;
            return $http.get(url);
        }
        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsernameAndPassword(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();