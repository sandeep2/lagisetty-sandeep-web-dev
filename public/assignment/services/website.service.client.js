/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService(){
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
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesforUserId(userId){
            var resultSet = [];
            for (var i in websites){
                if (websites[i].developerId === userId){
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

        function deleteWebsite(Id){
            for(var i in websites){
                if(websites[i]._id===Id){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function findWebsiteInstance(Id){
            for (var i in websites){
                if(websites[i]._id===Id)
                {
                    return websites[i];
                }
            }
        }

        function updateWebsite(website,Id){
            for (var i in websites){
                if(websites[i]._id===Id){
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
            return false;
        }
    }
})();