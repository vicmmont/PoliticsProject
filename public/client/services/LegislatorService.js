"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("LegislatorService", legislatorService);

    function legislatorService($http) {
        var currentLegislatorId = null;

        this.getCurrentLegislators = function(filters) {
            var route = "/legislator";
            var separator = "?";

            for(var key in filters) {
                if(filters.hasOwnProperty(key)){
                  route = route + separator + key + "=" + filters[key];
                  separator = "&";
                }
            }

            console.log("got " + route);
            return $http.get(route);
        }

        this.getLegislatorById = function(id) {
            return $http.get("/legislator/" + id);
        }

        this.getLegislatorBills = function(id) {
            return $http.get("/legislator/" + id + "/bill");
        }

        this.getCurrentLegislatorId = function() {
            return currentLegislatorId;;
        }
    }
})();