/**
 * Created by slagisetty on 6/22/2016.
 */
(function() {
    angular
        .module("WhereIsMyPet")
        .controller("PetProfileController", PetProfileController);

    function PetProfileController($routeParams, PetSearchService,$scope,UserService,$rootScope) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            PetSearchService.getPet(id, function (pet) {
                vm.pet = pet;
                $scope.$apply();
            });
        }

        init();

        function getAlllikes() {
            UserService
                .getAllLike(id)
                .then(function (response) {
                    vm.allUsers = response.data;
                }, function (error) {
                    vm.error = "Error in retrieving likes";
                })
        }

        getAlllikes();


        vm.likePets = function () {
            if ($rootScope.currentUser == null) {
                $('#notLoggedInDialog').modal('show');
                return;
            }
            userId = $rootScope.currentUser._id;
            UserService
                .likePets(userId, vm.pet)
                .then(function (user) {
                    console.log(user.favorites);
                    $rootScope.currentUser.favorites = user.data.favorites;
                    console.log($rootScope.currentUser.favorites);
                    getAlllikes();
                }, function (error) {
                    vm.error = "error in liking pet"
                })
        };

        vm.unlikePets = function () {
            userId = $rootScope.currentUser._id;
            UserService
                .unlikePets(userId, vm.pet)
                .then(function (user) {
                    $rootScope.currentUser.favorites = user.data.favorites;
                    getAlllikes();
                }, function (error) {
                    vm.error = "Error in unliking pets";
                });

        };

        $('.sign-in-up-buttons').click(function (e) {
            $('#notLoggedInDialog').modal('hide');
        });
    }

})();