/**
 * Created by slagisetty on 6/22/2016.
 */
(function() {
    angular
        .module("WhereIsMyPet")
        .controller("PetProfileController", PetProfileController);

    function PetProfileController($routeParams, PetSearchService,$scope) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            PetSearchService.getPet(id, function (pet) {
                vm.pet = pet;
                $scope.$apply();
        });

        }

        init();
    }

})();