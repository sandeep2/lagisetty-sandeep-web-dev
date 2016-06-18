/**
 * Created by slagisetty on 6/18/2016.
 */
/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("RegisterController",RegisterController);


    function RegisterController($location,UserService){
        var vm = this;

        vm.register = function(username,password,confirmPassword){
            if (username && password && confirmPassword) {
                UserService
                    .findUserPresent(username)
                    .then(
                        function(res){
                            if (res.data === "True") {
                                vm.error = "User already exists with this username";
                            }

                            else {
                                if (password === confirmPassword) {
                                    UserService
                                        .createUser(username, password)
                                        .then(
                                            function (res) {
                                                var user = res.data;
                                                $location.url("/user/" + user._id);
                                            },
                                            function (error) {
                                                vm.error = "Registration Failure";

                                            });

                                }

                                else {
                                    vm.error = "Passwords mismatch";
                                }
                            }
                        });
            }
            else{
                vm.error = "Please fill all the fields"
            }
        }
    }
})();