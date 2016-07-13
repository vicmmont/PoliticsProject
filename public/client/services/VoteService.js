"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("VoteService", VoteService);

    function VoteService($http) {
        var currentVoteId;

        this.getVoteForCurrentSession = function(year) {
            return $http.get("/vote");
        }

        this.getVoteById = function(id) {
            return $http.get("/vote/" + id);   
        }
    }
})();