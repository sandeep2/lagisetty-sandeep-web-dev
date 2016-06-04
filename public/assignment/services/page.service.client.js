/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService($http){

        var api = {
            findPagesforWebsiteId:findPagesforWebsiteId,
            findPageInstance:findPageInstance,
            deletePage: deletePage,
            updatePage:updatePage,
            createPage: createPage
        };
        return api;

        function createPage(Id, name, title) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: Id
            };
            return $http.post("/api/website/"+Id+"/page",newPage);
        }

        function findPageInstance(Id){
            var url = "/api/page/"+Id;
            return $http.get(url);
        }

        function findPagesforWebsiteId(Id){
            var url = "/api/website/"+Id+"/page";
            return $http.get(url);
        }

        function deletePage(Id){
            var url = "/api/page/"+Id;
            return $http.delete(url);
        }

        function updatePage(page,Id){
            var url = "/api/page/"+Id;
            return $http.put(url,page);
        }

    }
})();