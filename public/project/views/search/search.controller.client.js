(function() {
    angular
        .module("WhereIsMyPet")
        .controller("SearchController", SearchController);

    function SearchController($http,$rootScope,$location,PetSearchService,$scope,UserService) {
        var vm = this;
        vm.petBreeds = petBreeds;
        vm.query = {
          location: '02115',
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

        function init() {
            vm.initial = {
                location: '02120',
                animal: 'all'
            };
            PetSearchService
                .searchPets(vm.initial,function (petList) {
                    var temp = petList;
                    for (var i=0;i<temp.length;i++) {
                        if (temp[i].breed.length > 8) {
                            temp[i].breed = temp[i].breed.substring(0, 6) + "...";
                        }
                    }
                    $rootScope.petsRetrieved = temp;
                    $rootScope.$apply();
                })
        }

        init();
        
        vm.searchPets = function (query) {
            PetSearchService.searchPets(query, function (pets) {
                var temp = pets;
                for (var i=0;i<temp.length;i++) {
                    if (temp[i].breed.length > 7) {
                        temp[i].breed = temp[i].breed.substring(0, 4) + "...";
                    }
                }
                $rootScope.petsRetrieved = temp;
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
            UserService
                .likePets(userId,pet)
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
            UserService
                .unlikePets(userId,pet)
                .then(function(user){
                    $rootScope.currentUser.favorites = user.data.favorites;
                },function (error) {
                   vm.error = "Error in unliking pets";
                });
            
        };

        $('.sign-in-up-buttons').click(function (e) {
            $('#notLoggedInDialog').modal('hide');
        });
    }
})();