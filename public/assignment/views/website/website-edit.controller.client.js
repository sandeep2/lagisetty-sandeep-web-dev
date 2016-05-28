(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        vm.website = angular.copy(WebsiteService.findWebsiteInstance(vm.websiteId));

        function deleteWebsite(websiteId){
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website")
            }
            else{
                vm.error = "Unable to delete website";
            }
        }

        function updateWebsite(){
            var result = WebsiteService.updateWebsite(vm.website,vm.websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website")
            }
            else{
                vm.error = "unable to update website"
            }
        }

    }
})();