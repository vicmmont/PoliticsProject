"use strict";

(function(){
    angular
        .module("MyPoliticsApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "./client/views/overview/overview.html",
                controller: "OverviewController",
                controllerAs: "model"
            })
            .when("/bills", {
                templateUrl: "./client/views/bills/bills.html",
                controller: "BillsController",
                controllerAs: "model"
            })
            .when("/bill/:billId", {
                templateUrl: "./client/views/billDetail/billDetail.html",
                controller: "BillDetailController",
                controllerAs: "model"
            })
            .when("/legislator/:legislatorId", {
                templateUrl: "./client/views/legislatorDetail/legislatorDetail.html",
                controller: "LegislatorDetailController",
                controllerAs: "model"
            })
            .when("/legislators", {
                templateUrl: "./client/views/legislators/legislators.html",
                controller: "LegislatorsController",
                controllerAs: "model"
            })
            .when("/vote/:voteId", {
                templateUrl: "./client/views/voteDetail/voteDetail.html",
                controller: "VoteDetailController",
                controllerAs: "model"
            })
            .when("/votes", {
                templateUrl: "./client/views/votes/votes.html",
                controller: "VotesController",
                controllerAs: "model"
            })            
            .otherwise({
                redirectTo: "/home"
            });
    }
})();