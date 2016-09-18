"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillDetailController", billDetailController);

    function billDetailController(BillService, $location, $route, $routeParams) {
        var vm = this;
        vm.currentBillId = $routeParams["billId"];
        vm.currentBill = null;
        vm.urls = [];
        vm.hasError = false;
        vm.cosponsorsShown = false;
        vm.summaryShortShown = false;
        vm.summaryShown = false;

        function init() {
            BillService
                .getBillById(vm.currentBillId)
                .then(function(response){
                    if (response.data.results.length == 0){
                        vm.hasError = true;
                        return;
                    }

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
                    vm.hasError = true;
                });
        }

        init();

        vm.onLegislatorClick = function(id) {
            $location.url("/legislator/" + id);
        }

        vm.refreshPage = function() {
            $route.reload();
        }

        vm.clickCosponsorsButton = function() {
            vm.cosponsorsShown = !vm.cosponsorsShown;
        }

        vm.clickSummaryShortButton = function() {
            vm.summaryShortShown = !vm.summaryShortShown;
        }

        vm.clickSummaryButton = function() {
            vm.summaryShown = !vm.summaryShown;
        }
    }
})();