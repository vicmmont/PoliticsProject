"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("VoteService", VoteService);

    function VoteService($http) {
        var currentVoteId;

        this.getVotesForCurrentSession = function(filters, pageSize, pageNumber) {
            var validParams = ['vote_types', 'chambers'];
            var separator = "?";
            var route = "/vote"

            for(var key in filters) {
                if(filters.hasOwnProperty(key) && validParams.includes(key)){
                  route = route + separator + key + "=" + filters[key];
                  separator = "&";
                }
            }

            route = route + separator + "pageSize=" + pageSize;
            separator = "&";
            route = route + separator + "pageNumber=" + pageNumber;
            console.log("Route: " + route);
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