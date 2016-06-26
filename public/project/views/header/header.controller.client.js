/**
 * Created by slagisetty on 6/26/2016.
 */

(function () {
    angular
        .module("WhereIsMyPet")
        .controller("HeaderController", HeaderController);
    
    function HeaderController($scope,$rootScope,UserService,$location) {
        var vm = this;
        vm.logout = logout;

        function logout(){
            UserService
                .logout()
                .then(function(response){
                    $rootScope.currentUser = null;
                    $location.url("/login");
                },function (error) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                })
        }
    }
    
})();