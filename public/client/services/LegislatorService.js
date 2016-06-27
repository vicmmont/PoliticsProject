"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("LegislatorService", legislatorService);

    function legislatorService($http) {
        var currentLegislatorId;
        var dataFactory = {};

        dataFactory.getAllCurrentLegislators = function() {
            //return $http.get("https://congress.api.sunlightfoundation.com/votes?apikey=[API_KEY]&voted_at__gte=2016-01-01T04:00:00Z&fields=&order=voted_at__desc&per_page=50&page=1");
        }

        dataFactory.getLegislatorById = function(id) {
            
        }

        dataFactory.setCurrentLegislatorId = function(id) {
            currentLegislatorId = id;
        }

        dataFactory.getCurrentLegislatorId = function() {
            return currentLegislatorId;;
        }

        return dataFactory;
    }
})();