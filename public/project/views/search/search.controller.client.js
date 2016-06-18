(function() {
    angular
        .module("WhereIsMyPet")
        .controller("SearchController", SearchController);

    function SearchController($http,$rootScope,$location,PetSearchService,$scope) {
        var vm = this;
        vm.petBreeds = petBreeds;
        vm.query = {
          location: '02120',
           animal: 'all'
        };
        $rootScope.petsRetrieved = [];

        function petBreeds (animal) {
            PetSearchService
                .petBreeds(animal,function (response) {
                    vm.breeds = response;
                    $scope.$apply();
                })

        }
        
/*        function searchPets(selectedItems) {
            PetSearchService
                .searchPets(selectedItems)
                .then(function (response) {
                        $rootScope.petsRetrieved = response;
                        $rootScope.apply();
                    },
                    function (error) {
                        vm.error = "No pets for found for the selected combination";
                    });
        }*/

        vm.searchPets = function (query) {
            console.log('starting search');
            PetSearchService.searchPets(query, function (pets) {
                $rootScope.petsRetrieved = pets;
                $rootScope.$apply();
            });
            if (query.animal == 'all') {
                $scope.searchTitle = "pets near " + query.location;
            } else {
                $scope.searchTitle = query.animal + 's near ' + query.location;
            }
        };
    }
})();