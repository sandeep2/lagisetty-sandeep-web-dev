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
            findAllUsers: findAllUsers,
            createUser: createUser,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserPresent: findUserPresent,
            findUserByEmail: findUserByEmail,
            likePets: likePets,
            unlikePets: unlikePets,
            userPets: userPets,
            getAllLike: getAllLike,
            findUserByHashCredentials:findUserByHashCredentials,
            updateHashUser: updateHashUser
        };
        return api;

        function updateHashUser(id,newUser){
            var url = "/api/project/hashUser/" + id;
            return $http.put(url, newUser);
        }

        function findUserByHashCredentials(username,password){
            var url = "/api/project/hashUser?username="+username+"&password="+password;
            return $http.get(url);
        }
        
        function getAllLike(id){
            url = "/api/project/allLikes/"+id;
            return $http.get(url);
        }
        
        function unlikePets(id,pet){
            var url = "/api/project/unlike/"+id;
            return $http.put(url,pet);
        }
        
        function userPets(id){
            return $http.get("/api/project/pets/"+id)
        }
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
        
        function findAllUsers(){
            return $http.get("/api/project/user");
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

        function likePets (id,pet){
            var newPet = {
                petId: pet.id,
                age: pet.age,
                name: pet.name
            };
            var url = "/api/project/like/"+id;
            return $http.put(url,newPet);
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/project/user/" + id;
            return $http.put(url, newUser);
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