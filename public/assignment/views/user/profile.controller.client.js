(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        var id = $rootScope.currentUser._id;

        function init() {
            if (!userId && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            }
            else {
                UserService
                    .findUserById(id)
                    .then(function (response) {
                        vm.user = response.data;
                    });
            }
        }
        init();

        function logout(){
            UserService
                .logout()
                .then(function(response){
                    $location.url("/login");
                },function () {
                    $location.url("/login");
                })
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }
    }

})();