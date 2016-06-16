(function() {
    angular
        .module("WhereIsMyPet")
        .controller("SearchController", SearchController);

    function SearchController($http,$location,PetSearchService,$scope) {
        var vm = this;
    }
    
    vm.petBreeds = function(animal){
        PetSearchService
            .petBreeds(animal)
            .then(function(response){
                vm.breeds = response;
                $scope.apply();
            },
            function(error){
                vm.error = "cannot find breeds for this pet";
            })
    };
    
    $rootScope.petsRetrieved = []
    vm.searchPets = function(selectedItems){
        PetSearchService
            .searchPets(input)
            .then(function (response) {
                $rootScope.petsRetrieved = response;
                $rootScope.apply();
            },
            function (error) {
               vm.error = "No pets for found for the selected combination"; 
            });
    }
})();