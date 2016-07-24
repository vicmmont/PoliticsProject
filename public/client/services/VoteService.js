"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("VoteService", VoteService);

    function VoteService($http) {
        var currentVoteId;

        this.getVotesForCurrentSession = function(pageSize, pageNumber) {
            var route = "/vote" + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber;
            return $http.get(route);
        }

        this.getVoteById = function(id) {
            return $http.get("/vote/" + id);   
        }

        this.getVotesByLegislatorId = function(legislatorId, informationType, pageSize, pageNumber) {
            return $http.get("/legislator/" + legislatorId + "/vote?pageSize=" + pageSize + "&pageNumber=" + pageNumber);
        }
    }
})();