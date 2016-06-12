/**
 * Created by slagisetty on 5/29/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController",EditWidgetController);


    function EditWidgetController($location,$routeParams,WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.hideDelete = $location.search().hide;

        function init() {
            WidgetService
                .findWidgetInstance(vm.widgetId)
                .then(function(res){
                    vm.widget = angular.copy(res.data);
                });
        }
        init();

        function updateWidget(){
            if(vm.widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, vm.widget)
                    .then(function (res) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = "Error editing widget"
                        }
                    );
            }
        }

        function deleteWidget(Id){
            WidgetService
                .deleteWidget(Id)
                .then(function(res){
                        return $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function(error){
                        vm.error = "Error in deleting widget";
                    }
                );
        }
    }

})();