"use strict";
(function() {
    angular
        .module("MyPoliticsApp")
        .service("BillService", billService);

    function billService($http) {
        var currentBillId;
        var dataFactory = {};

        dataFactory.getAllBillsForYear = function(year) {
            return $http.get('https://congress.api.sunlightfoundation.com/bills?apikey='
                + api_key + '&last_action_at__gte="' + 
                year +
                '-01-01T00:00:00Z"&order=last_action_at&fields=bill_id,bill_type,a,chamber,introduced_on,last_action_at,official_title,short_title,summary,urls,actions,sponsor,cosponsors');
        }

        dataFactory.getNMostRecentBillsForYear = function(count, year) {
            
        }

        dataFactory.getBillById = function(id) {
            
        }

        dataFactory.setCurrentBillId = function(id) {
            currentVoteId = id; 
        }

        dataFactory.getCurrentBillId = function() {
            return currentBillId;
        }

        return dataFactory;
    }
})();