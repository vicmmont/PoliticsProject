"use strict";
(function() {
    angular
        .module("MyPoliticsApp")
        .service("BillService", billService);

    function billService($http) {

        this.getBillsForCurrentSession = function(year) {
            return $http.get("/bill");
        }

        this.getNMostRecentBillsForYear = function(count, year) {
            
        }

        this.getBillById = function(id) {
            return $http.get("/bill/" + id);
        }
    }
})();