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
                    if (password === confirmPassword) {
                        UserService
                            .createUser(username, password)
                            .then(
                                function(res) {
                                    var user = res.data;
                                    $location.url("/user/" + user._id);
                                },
                                function(error){
                                    vm.error = "Registration Failure";

                                });
                    }
                    else {
                        vm.error = "Passwords mismatch";
                    }

            }
            else{
                vm.error = "Please fill all the fields"
            }
        }
    }
})();