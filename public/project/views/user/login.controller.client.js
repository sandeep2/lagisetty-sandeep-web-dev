/**
 * Created by slagisetty on 6/18/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService,$rootScope,$scope) {
        var vm = this;
        $scope.checkbox = 1;

        $scope.$watch(function(){
            return $scope.checkbox;
        }, function(){
            $scope.checkbox = Number($scope.checkbox);
            console.log($scope.checkbox, typeof $scope.checkbox);
        },true);

        vm.login = function(username, password) {
            if($scope.checkbox == 1){
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
            else{
                AdminService
                    .login(username,password)
                    .then(function(response){
                       var admin = response.data;
                        if(admin && admin._id){
                            $rootScope.currentUser  = admin;
                            $location.url("/admin");
                        }
                        else{
                            $rootScope.currentUser = null;
                            vm.error = "admin not found";
                        }
                    },function(error){
                        $rootScope.currentUser = null;
                        vm.error = "admin not found";
                    });
            }
        }
    }
})();