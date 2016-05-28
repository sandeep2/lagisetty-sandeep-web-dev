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
        vm.page = angular.copy(PageService.findPageInstance(vm.pageId));
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function deletePage(pageId){
            var result = PageService.deletePage(pageId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else{
                vm.error = "Unable to delete page";
            }
        }

        function updatePage(){
            var result = PageService.updatePage(vm.page,vm.pageId);
            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else{
                vm.error = "unable to update page"
            }
        }
    }
})();