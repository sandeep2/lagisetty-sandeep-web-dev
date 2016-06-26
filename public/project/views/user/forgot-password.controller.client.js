/**
 * Created by slagisetty on 6/18/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("ForgotController", ForgotController);

    function ForgotController($location, UserService) {
        var vm = this;
        vm.forgot = function(email) {
            UserService
                .findUserByEmail(email)
                .then(function(response){
                    var user = response.data;
                    console.log(user);
                    if(user) {
                        vm.success = "Password Sent to your email"
                    } else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();