"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillsController", billsController);

    function billsController($scope, BillService) {
        $scope.message = "No message";
        $scope.bills = [];

        function init() {
        	BillService.getAllBillsForYear(2016)
        	.then(function(response) {
        		$scope.message = "Successful retrieval of information";
        		$scope.bills = response.data.results;
			}, function(error) {
				$scope.message = error;
			});
        }

        init();
    }
})();