"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("VoteService", VoteService);

    function VoteService($http) {
        var currentVoteId;
        var dataFactory = {};

        dataFactory.getAllVotesForYear = function(year) {
            return $http.get("https://congress.api.sunlightfoundation.com/votes?apikey=[API_KEY]&voted_at__gte=2016-01-01T04:00:00Z&fields=&order=voted_at__desc&per_page=50&page=1");
        }

        dataFactory.getNMostRecentVotesForYear = function(count, year) {
            
        }

        dataFactory.getVoteById = function(id) {
            
        }

        dataFactory.setCurrentVoteId = function(id) {
            currentVoteId = id; 
        }

        dataFactory.getCurrentVoteId = function() {
            return currentVoteId;
        }

        return dataFactory;
    }
})();