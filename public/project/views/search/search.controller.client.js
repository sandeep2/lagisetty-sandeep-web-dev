(function() {
    angular
        .module("WhereIsMyPet")
        .controller("SearchController", SearchController);

    function SearchController($http,$rootScope,$location,PetSearchService,$scope,UserService) {
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
        
        vm.searchPets = function (query) {
            PetSearchService.searchPets(query, function (pets) {
                $rootScope.petsRetrieved = pets;
                $rootScope.$apply();
            });
            if (query.animal == 'all') {
                vm.searchTitle = "pets near " + query.location;
            } else {
                vm.searchTitle = query.animal + 's near ' + query.location;
            }
        };
        
        vm.likePets = function (pet) {
            if($rootScope.currentUser == null){
                $('#notLoggedInDialog').modal('show');
                return;
            }
            userId = $rootScope.currentUser._id;
            UserService.likePets(userId,pet);
        }

        $('.sign-in-up-buttons').click(function (e) {
            $('#notLoggedInDialog').modal('hide');
        });
    }
})();