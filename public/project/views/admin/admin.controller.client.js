/**
 * Created by slagisetty on 6/23/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .controller("AdminController", AdminController);

    function AdminController($routeParams,$rootScope,UserService,AdminService,$location){
        var vm = this;
        var admin = $rootScope.user;
        vm.approve = approve;
        vm.decline = decline;
        vm.logout = logout;

        function logout(){
            AdminService
                .logout()
                .then(function(response){
                    $rootScope.currentUser = null;
                    $location.url("/login");
                },function (error) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                })
        }

        function init(){
            UserService
                .findAllUsers()
                .then(function(response){
                    vm.users = response.data
                },function(error){
                    vm.error = "error in retrieving all users";
                });
        }

        init();

        function approve(user) {
            user.status = "approved";
            admin.usersPresent.push(user);
            AdminService
                .updateAdmin(admin._id,admin)
                .then(function (adm) {
                        UserService
                            .updateUser(user._id,user)
                            .then(function(us){
                                UserService
                                    .findAllUsers()
                                    .then(function(usrs){
                                        vm.users = usrs.data;
                                    },function(error){
                                        vm.error = "Error in approving user"
                                    });
                            },function(error){
                                vm.error = "Error in approving user";
                            })
                    },
                    function(error){
                        vm.error = "error in approving user";
                    })

        }

        function decline(user) {
            user.status = "decline";
            UserService
                .deleteUser(user._id)
                .then(function(response){
                    UserService
                        .findAllUsers()
                        .then(function (usrs) {
                                vm.users = usrs.data
                            },
                            function(error){
                                vm.error = "Error";
                            })
                },function(error){
                    vm.error = "Error in removing user";
                })
        }


    }
})();
