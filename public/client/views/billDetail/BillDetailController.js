"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillDetailController", billDetailController);

    function billDetailController(BillService, $routeParams) {
        var vm = this;
        vm.currentBillId = $routeParams["billId"];
        vm.currentBill = null;

        function init() {
            BillService
                .getBillById(vm.currentBillId)
                .then(function(response){
                    vm.currentBill = response.data.results[0];
                }, function(error){
                    console.log("Error retrieving single bill");
                    return;
                });
        }

        init();
    }
})();