"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("LegislatorService", legislatorService);

    function legislatorService($http) {
        var currentLegislatorId = null;

        this.getAllCurrentLegislators = function() {
            return $http.get("/legislator");
        }

        this.getLegislatorById = function(id) {
            return $http.get("/legislator/" + id);
        }

        this.setCurrentLegislatorId = function(id) {
            currentLegislatorId = id;
        }

        this.getCurrentLegislatorId = function() {
            return currentLegislatorId;;
        }
    }
})();