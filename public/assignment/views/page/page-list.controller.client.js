(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;


        function init() {
            PageService
                .findPagesforWebsiteId(vm.websiteId)
                .then(function (res) {
                    vm.pages = res.data;
                })
        }

        init();
    }
})();