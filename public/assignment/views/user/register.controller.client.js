/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,UserService){
        var vm = this;

        vm.register = function(username,password,confirmPassword){
            if (username && password && confirmPassword) {
                if (! UserService.findUserPresent(username)) {
                    if (password === confirmPassword) {
                        var user = UserService.createUser(username, password);
                        if (user) {
                            $location.url("/profile/" + user._id);
                        }
                        else {
                            vm.error = "Registration Failure";
                        }
                    }
                    else {
                        vm.error = "Passwords mismatch";
                        return null;
                    }
                }
                else{
                    vm.error = "User already exists with this username";
                }
            }
            else{
                vm.error = "Please fill all the fields"
            }
        }
    }
})();