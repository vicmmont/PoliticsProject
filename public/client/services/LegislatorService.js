"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .service("LegislatorService", legislatorService);

    function legislatorService($http) {
        
        /* API */
        this.getCurrentLegislators = function(filters) {
            var validParams = ['parties', 'chambers', 'states', 'order'];
            var route = "/legislator";
            var separator = "?";

            for(var key in filters) {
                if(filters.hasOwnProperty(key) && validParams.includes(key)){
                  route = route + separator + key + "=" + filters[key];
                  separator = "&";
                }
            }

            console.log("Making request to the back end " + route);
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