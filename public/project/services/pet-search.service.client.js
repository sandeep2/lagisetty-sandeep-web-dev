/**
 * Created by slagisetty on 6/15/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .factory("PetSearchService",PetSearchService);

    var apiKey = "ab7987493e79f85bcf78f199991571d4";
    var apiSecret = "44f45dbb0d2612846bf4daf02d7b240c";
    function PetSearchService($http,$rootScope){

        var api = {
            petBreeds:petBreeds,
            searchPets: searchPets,
            getPet: getPet
        };
        return api;

        function getPet(id,callback){
            $.getJSON('http://api.petfinder.com/pet.get?format=json&key=' + apiKey + '&callback=?&id=' + id)
                .success(function (response) {
                    var pet = convertJson(response.petfinder.pet);
                    callback(pet);
                });
        }


        function searchPets(query,callback) {
            var animal = query.animal;
            var location = query.location;
            var breed = query.breed;
            var age = query.age;
            var gender = query.gender;
            var url = 'http://api.petfinder.com/pet.find?format=json&key=' + apiKey + '&callback=?&output=basic';

            if(animal != 'all'){
                url += '&animal='+animal;
            }
            if(location){
                url += '&location='+location;
            }
            if (breed) {
                url += '&breed=' + breed;
            }
            if (age) {
                url += '&age=' + age;
            }
            if (gender) {
                url += '&sex=' + gender;
            }

            $.getJSON(url)
                .success(function (response) {
                    var pets = [];
                    angular.forEach(response.petfinder.pets.pet, function (pet) {
                        var pet = convertJson(pet);
                        if (pet) pets.push(pet);
                    });
                    callback(pets);
                });
        }


        function petBreeds(pet,callback) {
            $.getJSON('http://api.petfinder.com/breed.list?format=json&key=' + apiKey + '&callback=?&animal=' + pet)
                .success(function (breedsList) {
                    var breeds = [];
                    angular.forEach(breedsList.petfinder.breeds.breed, function (breed) {
                        var breed = breed["$t"];
                        if (breed) breeds.push(breed);
                    });
                    callback(breeds);
                });
        }
        function getBreed(value) {
            var breed = "";
            if (value["$t"]) {
                breed = value["$t"];
            } else {
                breed = value[0]["$t"];
            }
            return breed;
        }

        function convertJson(givenPet) {
            var pet = {};
            angular.forEach(givenPet, function (value, key) {
                if (value["$t"]) {
                    pet[key] = value["$t"];
                }
                if (key == "contact"){
                    pet["contact"] = getContact(value)
                }
                if (value["photos"]) {

                    pet["image"] = getImage(value["photos"]["photo"]);
                }
                if (value["breed"]) {
                    pet["breed"] = getBreed(value["breed"]);
                }

            });
            return pet;
        }
        
        function getContact(contact) {
            var newContact = {};
            angular.forEach(contact, function (value, key) {
                if (value["$t"]){
                    newContact[key] = value["$t"];
                }
            });
            return newContact;
        }

        function getImage(array) {
            var img = [];
            angular.forEach(array, function (photo) {
                if (photo["@size"] == 'pn') {
                    img.push(photo['$t']);
                }
            });

            return img;
        }

    }
})();