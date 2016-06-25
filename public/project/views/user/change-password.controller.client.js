/**
 * Created by Sandeep on 6/24/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("ChangeController", ChangeController);


    function ChangeController($location, UserService) {
        var vm = this;
        var hashUsername = $location.search().us;
        var hashPassword = $location.search().pa;

        function init(){
            UserService
                .findUserByHashCredentials(hashUsername,hashPassword)
                .then(function(response){
                    vm.user = response.data;
                    vm.success = "please change your password";
                },function(error){
                    vm.error = "Failure in changing your password";
                });
        }
        init();

        vm.change = function(password,password2) {
            if(password === password2){
                vm.user.password = password;
                console.log(vm.user)
                UserService
                    .updateHashUser(vm.user._id,vm.user)
                    .then(function(resp){
                        vm.success = "passwords updated"
                    },function(error){
                        vm.error = "Error updating password";
                    });

            }
            else{
                vm.error = "Passwords do not match";
            }
        }
    }
})();