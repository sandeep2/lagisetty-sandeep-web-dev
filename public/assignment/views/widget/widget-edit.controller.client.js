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
        vm.widget = angular.copy(WidgetService.findWidgetInstance(vm.widgetId));

        function updateWidget(){
            var result = WidgetService.updateWidget(vm.widgetId,vm.widget);
            if (result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error = "Error editing widget"
            }
        }

        function deleteWidget(Id){
            var result = WidgetService.deleteWidget(Id);
            if(result){
                return $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error = "Error in deleting widget";
            }
        }
    }

})();