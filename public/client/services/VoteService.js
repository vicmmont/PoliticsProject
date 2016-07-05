"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("VoteService", VoteService);

    function VoteService($http) {
        var currentVoteId;

        this.getAllVotesForYear = function(year) {
            return $http.get("/vote");
        }

        this.getNMostRecentVotesForYear = function(count, year) {
            
        }

        this.getVoteById = function(id) {
            
        }

        this.setCurrentVoteId = function(id) {
            currentVoteId = id; 
        }

        this.getCurrentVoteId = function() {
            return currentVoteId;
        }
    }
})();