/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);


    function WebsiteService($http){
        var api = {
            findWebsitesforUserId:findWebsitesforUserId,
            deleteWebsite: deleteWebsite,
            findWebsiteInstance:findWebsiteInstance,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite
        };
        return api;

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                name:name,
                description:desc,
                developerId: developerId
            };
            return $http.post("/api/user/"+developerId+"/website",newWebsite)
        }

        function findWebsitesforUserId(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function deleteWebsite(id){
            url = ("/api/website/"+id);
            return $http.delete(url);
        }

        function findWebsiteInstance(id){
            var url = "/api/website/"+id;
            return $http.get(url);
        }

        function updateWebsite(website,id){
            var url = "/api/website/"+id;
            return $http.put(url,website);
        }
    }
})();