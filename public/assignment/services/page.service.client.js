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
            pages.push(newPage);
            console.log(pages);
            return newPage;
        }

        function findPageInstance(Id){
            for(var i in pages){
                if(pages[i]._id===Id){
                    return pages[i];
                }
            }
        }

        function findPagesforWebsiteId(Id){
            var resultSet = [];
            for (var i in pages){
                if (pages[i].websiteId === Id){
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

        function deletePage(Id){
            for(var i in pages){
                if(pages[i]._id===Id){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function updatePage(page,Id){
            for (var i in pages){
                if(pages[i]._id===Id){
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return true;
                }
            }
            return false;
        }

    }
})();