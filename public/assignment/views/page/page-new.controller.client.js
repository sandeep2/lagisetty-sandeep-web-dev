/**
 * Created by slagisetty on 5/27/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(name, title) {
            if(name != null && name != '') {
                PageService
                    .createPage(vm.websiteId, name, title)
                    .then(function (res) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = "Unable to create page";
                        }
                    );
            }
            else{
                vm.error = "Please enter a page name";
            }
        }
    }
})();