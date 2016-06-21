/**
 * Created by slagisetty on 6/18/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService,$rootScope) {
        var vm = this;
        vm.login = function(username, password) {
            UserService
                .login(username, password)
                .then(function(response){
                    var user = response.data;
                    if(user && user._id) {
                        $rootScope.currentUser  = user;
                        $location.url("/user");
                    } else {
                        $rootScope.currentUser = null;
                        vm.error = "User not found";
                    }
                },function(error){
                    $rootScope.currentUser = null;
                    vm.error = "User not found"
                });
        }
    }
})();