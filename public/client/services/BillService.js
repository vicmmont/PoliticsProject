"use strict";
(function() {
    angular
        .module("MyPoliticsApp")
        .service("BillService", billService);

    function billService($http) {

        this.getBillsForCurrentSession = function(pageSize, pageNumber, query) {
            var route = "/bill?pageSize=" + pageSize + "&pageNumber=" + pageNumber;

            if (query === undefined || query === null || query.trim() === "") {
                return $http.get(route);    
            }

            return $http.get(route + "&query=" + query);
        }

        this.getBillsByLegislatorId = function(id, billType, pageSize, pageNumber) {
            return $http.get("/legislator/" + id + "/bill" + "?billType=" + billType + "&pageSize=" + pageSize + "&pageNumber=" + pageNumber);
        }

        this.getBillById = function(id) {
            return $http.get("/bill/" + id);
        }
    }
})();