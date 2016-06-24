/**
 * Created by slagisetty on 6/23/2016.
 */
(function() {
    angular
        .module("WhereIsMyPet")
        .controller("PetUserController", PetUserController);

    function PetUserController($routeParams, UserService,$scope) {
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
    }

})();