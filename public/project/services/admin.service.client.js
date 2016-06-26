/**
 * Created by slagisetty on 6/23/2016.
 */
(function() {
    angular
        .module("WhereIsMyPet")
        .factory("AdminService", AdminService);

    function AdminService($http) {
        var api = {
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            createAdmin: createAdmin,
            register: register,
            findAdminByCredentials: findAdminByCredentials,
            findAdminById: findAdminById,
            updateAdmin: updateAdmin,
            deleteAdmin: deleteAdmin,
            findAdminPresent: findAdminPresent
        };
        return api;

        function deleteAdmin(id) {
            var url = "/api/project/admin/" + userId;
            return $http.delete(url);
        }
        
        function findAdminPresent(username){
            var url = "/api/project/admin/?username=" + username;
            return $http.get(url);
        }

        function updateAdmin(id,newAdmin){
            var url = "/api/project/admin/" + id;
            return $http.put(url, newAdmin);
        }
        
        function createAdmin(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/admin", user);
        }

        function register(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/admin/register",user);
        }

        function loggedIn(){
            return $http.get("/api/project/admin/loggedIn");
        }

        function login(username,password){
            var admin = {
                username: username,
                password: password
            };
            return $http.post("/api/project/admin/login",admin);
        }

        function findAdminById(id) {
            var url = "/api/project/admin/" + id;
            return $http.get(url);
        }
        function findAdminByCredentials(username,password) {
            var url = "/api/project/admin?username="+username+"&password="+password;
            return $http.get(url);
        }

        function logout(){
            return $http.post("/api/project/admin/logout");
        }
    }
})();