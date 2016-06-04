/**
 * Created by slagisetty on 5/27/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            findWidgetsForPageId: findWidgetsForPageId,
            createWidget: createWidget,
            findWidgetInstance:findWidgetInstance,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function deleteWidget(Id){
            var url = "/api/widget/"+Id;
            return $http.delete(url);
        }

        function updateWidget(Id,widget){
            var url = "/api/widget/"+Id;
            return $http.put(url,widget);
        }

        function findWidgetInstance(Id){
            var url = "/api/widget/"+Id;
            return $http.get(url);
        }

        function findWidgetsForPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function createWidget(widgetType,pageId){
            var newWidget = {
                widgetType: widgetType,
                pageId: pageId
            };
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url,newWidget);
        }
    }
})();