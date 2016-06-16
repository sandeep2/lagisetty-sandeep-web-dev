/**
 * Created by slagisetty on 6/15/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .factory("PetSearchService",PetSearchService);

    function PetSearchService($http){
g
        var api = {
            petBreeds:petBreeds,
            searchPets: searchPets,
            getPet: getPet
        };
        return api;




    }
})();