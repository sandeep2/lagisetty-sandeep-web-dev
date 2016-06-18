/**
 * Created by slagisetty on 6/15/2016.
 */
(function(){
    angular
        .module("WhereIsMyPet")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/search',{
                templateUrl: "views/search/search.view.client.html",
                controller: "SearchController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo:"/search"
            })
    }
})();