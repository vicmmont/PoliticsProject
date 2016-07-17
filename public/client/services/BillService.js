"use strict";
(function() {
    angular
        .module("MyPoliticsApp")
        .service("BillService", billService);

    function billService($http) {

        this.getBillsForCurrentSession = function(year) {
            return $http.get("/bill");
        }

        this.getBillsByLegislatorId = function(id, billType, pageSize, pageNumber) {
            return $http.get("/legislator/" + id + "/bill" + "?billType=" + billType + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber);
        }

        this.getBillById = function(id) {
            return $http.get("/bill/" + id);
        }
    }
})();