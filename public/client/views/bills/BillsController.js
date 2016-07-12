"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillsController", billsController);

    function billsController(BillService, $location) {
        var vm = this;
        vm.bills = [];

        function init() {
        	BillService.getBillsForCurrentSession()
        	.then(function(response) {
        		vm.bills = response.data.results;
			}, function(error) {
				console.log(error);
			});
        }

        init();

        vm.onBillClick = function(id) {
            $location.url("/bill/" + id);
        }
    }
})();