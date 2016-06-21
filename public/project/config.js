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
            .when('/login',{
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when('/register',{
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs:"model"
            })
            .when('/forgot',{
                templateUrl:"views/user/forgot-password.view.client.html",
                controller:"ForgotController",
                controllerAs:"model"
            })
            .when('/user',{
                templateUrl:"views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve:{
                    loggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo:"/search"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        //console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }
})();