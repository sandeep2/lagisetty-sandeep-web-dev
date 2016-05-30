(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams.id;

        vm.user = angular.copy(UserService.findUserInstance(id));


        function updateUser(newUser) {
            var result = UserService.updateUser(id, newUser);
            if(result === true)
            {
                vm.success = "Profile updated";
            }
            else{
                vm.error="Error in updating profile";
            }
        }
    }

})();