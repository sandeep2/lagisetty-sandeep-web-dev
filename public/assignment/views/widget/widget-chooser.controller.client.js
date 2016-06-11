/**
 * Created by slagisetty on 5/29/2016.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController);

    function WidgetChooserController($location,$routeParams,WidgetService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;

        vm.createWidget = createWidget;

        function createWidget(widgetType){
            WidgetService
                .createWidget(widgetType,vm.pageId)
                .then(function(res){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+res.data._id).search({hide: 'true'});
                    },
                    function(error){
                        vm.error = "unable to create page";
                    }
                );
        }
    }
})();