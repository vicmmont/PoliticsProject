"use strict";

(function(){
    angular
        .module("MyPoliticsApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./client/views/overview/overview.html",
                controller: "OverviewController"
            })
            .when("/billDetail", {
                templateUrl: "./client/views/billDetail/billDetail.html",
                controller: "BillDetailController"
            })
            .when("/bills", {
                templateUrl: "./client/views/bills/bills.html"
                controller: "BillsController"
            })
            .when("/legislatorDetail", {
                templateUrl: "./client/views/legislatorDetail/legislatorDetail.html"
                controller: "legislatorDetailController"
            })
            .when("/legislator", {
                templateUrl: "./client/views/legislator/legislator.html"
                controller: "legislatorController"
            })
            .when("/voteDetail", {
                templateUrl: "./client/views/voteDetail/voteDetail.html"
                controller: "VoteDetailController"
            })
            .when("/votes", {
                templateUrl: "./client/views/votes/votes.html"
                controller: "VotesControllers"
            })            
            .otherwise({
                redirectTo: "/home"
            });
    }
})();