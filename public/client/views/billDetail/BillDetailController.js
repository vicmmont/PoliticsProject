"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillDetailController", billDetailController);

    function billDetailController(BillService, $routeParams, $location) {
        var vm = this;
        vm.currentBillId = $routeParams["billId"];
        vm.currentBill = null;
        vm.urls;

        function init() {
            BillService
                .getBillById(vm.currentBillId)
                .then(function(response){
                    vm.currentBill = response.data.results[0];
                    
                    var urls = vm.currentBill.urls;
                    if (urls != undefined) {
                        var urlProperties = [];
                        for (var property in urls) {
                            if (urls.hasOwnProperty(property)) {
                                urlProperties.push(property);
                            }
                        }
                        vm.urls = urlProperties;
                    }

                }, function(error){
                    console.log("Error retrieving single bill");
                    return;
                });
        }

        init();

        vm.onLegislatorClick = function(id) {
            $location.url("/legislator/" + id);
        }
    }
})();