/**
 * Created by slagisetty on 6/4/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService,WidgetService,$location,$routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response){
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                },
                function(error){
                    vm.error = "Search key did not yield any photos"
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetInstance(vm.widgetId)
                .then(function(res){
                    var widget = res.data;
                    widget.url = url;
                    WidgetService
                        .updateWidget(vm.widgetId,widget)
                        .then(function(res){
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                        },
                            function(error){
                                vm.error = "Unable to add the flickr image"
                            }
                        )
                },
                    function(error){
                        vm.error = "unable to retrieve the id";
                    }
                );
        }
    }
})();