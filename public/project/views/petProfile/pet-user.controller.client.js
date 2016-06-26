/**
 * Created by slagisetty on 6/23/2016.
 */
(function() {
    angular
        .module("WhereIsMyPet")
        .controller("PetUserController", PetUserController);

    function PetUserController($routeParams, UserService,$scope,$rootScope) {
        var vm = this;
        var id = $routeParams.userId;
        

        function init() {
                UserService
                    .userPets(id)
                    .then(function(response){
                        vm.pets = response.data;
                    },function(error){
                        vm.error = "Could not get pets for this error";
                    })
        }

        init();

        vm.likePets = function (pet) {
            if($rootScope.currentUser == null){
                $('#notLoggedInDialog').modal('show');
                return;
            }
            userId = $rootScope.currentUser._id;
            var newPet = {};
            newPet.id = pet.petId;
            newPet.image = pet.media;
            newPet.age = pet.age;
            newPet.breed = pet.breed;
            newPet.sex = pet.sex;
            UserService
                .likePets(userId,newPet)
                .then(function(user){
                    console.log(user.favorites);
                    $rootScope.currentUser.favorites = user.data.favorites;
                    console.log($rootScope.currentUser.favorites);
                },function(error){
                    vm.error = "error in liking pet"
                })
        };

        vm.unlikePets = function(pet){
            userId = $rootScope.currentUser._id;
            pet.id = pet.petId;
            UserService
                .unlikePets(userId,pet)
                .then(function(user){
                    $rootScope.currentUser.favorites = user.data.favorites;
                    init();
                },function (error) {
                    vm.error = "Error in unliking pets";
                });

        };

        $('.sign-in-up-buttons').click(function (e) {
            $('#notLoggedInDialog').modal('hide');
        });

    }

})();