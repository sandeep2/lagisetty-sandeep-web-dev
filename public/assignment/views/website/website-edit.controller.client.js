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

        function init() {
            WebsiteService
                .findWebsiteInstance(vm.websiteId)
                .then(function(res){
                    vm.website = angular.copy(res.data);
                })
        }
        init();

        function deleteWebsite(websiteId){
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function(res) {
                    $location.url("/user/" + vm.userId + "/website");
                },
                function(error){
                    vm.error = "error in deleting website";
                })
        }

        function updateWebsite(){
            if(vm.website.name && vm.website.name != "") {
                WebsiteService
                    .updateWebsite(vm.website, vm.websiteId)
                    .then(function (res) {
                            $location.url("/user/" + vm.userId + "/website")
                        },
                        function (error) {
                            vm.error = "unable to update website"
                        });
            }
            else{
                vm.error = "Please Enter a Website Name";
            }
        }

    }
})();