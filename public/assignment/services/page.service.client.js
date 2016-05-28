/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService(){

        var api = {
            findPagesforWebsiteId:findPagesforWebsiteId
        };
        return api;

        function findPagesforWebsiteId(Id){
            var resultSet = [];
            for (var i in pages){
                if (pages[i].websiteId === Id){
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

    }
})();