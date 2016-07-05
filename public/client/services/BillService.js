"use strict";
(function() {
    angular
        .module("MyPoliticsApp")
        .service("BillService", billService);

    function billService($http) {
        var currentBillId;

        this.getAllBillsForYear = function(year) {
            return $http.get('/bill');
        }

        this.getNMostRecentBillsForYear = function(count, year) {
            
        }

        this.getBillById = function(id) {
            
        }

        this.setCurrentBillId = function(id) {
            currentVoteId = id; 
        }

        this.getCurrentBillId = function() {
            return currentBillId;
        }
    }
})();