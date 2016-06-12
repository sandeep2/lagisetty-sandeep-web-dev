/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    function EditPageController($location,$routeParams,PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageInstance(vm.pageId)
                .then(function (response) {
                    vm.page = angular.copy(response.data);
                });
        }

        init();

        function deletePage(pageId){
            PageService
                .deletePage(pageId)
                .then(function(res){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    },
                    function(error){
                        vm.error = "Unable to delete page";
                    }
                );
        }

        function updatePage(){
            if(vm.page.name) {
                PageService
                    .updatePage(vm.page, vm.pageId)
                    .then(function (res) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = "unable to update page"
                        }
                    );
            }
        }
    }
})();