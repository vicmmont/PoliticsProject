"use strict";

(function(){
    angular
        .module("MyPoliticsApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "navbar/navbar.html",
                controller: "navbarController.js"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();