"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("BillsController", billsController);

    function billsController(BillService, $location, $route, $routeParams) {
        var vm = this;
        vm.bills = [];
        vm.searchTerm = null;
        vm.displayMessage = null;
        vm.pageSize = 48;
        vm.totalBillCount = 0;
        vm.searchParameter = null;
        vm.hasError = false;
        vm.hasLoadError = false;
        vm.loadingInformation = false;

        function init() {
            vm.searchParameter = $routeParams["q"];
            var pageNumber = 1;

            vm.loadingInformation = true;
            BillService.getBillsForCurrentSession(vm.pageSize, pageNumber, vm.searchParameter)
                .then(function(response) {
                    vm.loadingInformation = false;
                    vm.bills = response.data.results;

                    if (vm.searchParameter != null && vm.searchParameter.trim() != "") {
                        vm.searchParameter = vm.searchParameter.trim();
                        vm.displayMessage = ' results found for "' + vm.searchParameter + '"'; 
                    } else {
                        vm.displayMessage = " bills found for current session"
                    }

                    vm.totalBillCount = response.data.count;
                }, function(error) {
                    vm.hasError = true;
            });
        }

        init();

        vm.onBillClick = function(id) {
            $location.url("/bill/" + id);
        }

        vm.getMoreBills = function(dataCount) {
            vm.hasLoadError = false;
            var pageNumber = 0;

            if (dataCount != vm.pageSize) {
                pageNumber = vm.bills.length / dataCount; 
                
                if (dataCount > vm.pageSize && pageNumber % 1 != 0) {
                    pageNumber = vm.bills.length / vm.pageSize;
                } else {
                    vm.pageSize = dataCount; 
                }
            } else {
                pageNumber = vm.bills.length / vm.pageSize;
            }

            pageNumber += 1;

            vm.loadingInformation = true;
            BillService.getBillsForCurrentSession(vm.pageSize, pageNumber, vm.searchParameter)
                .then(function(response) {
                    vm.loadingInformation = false;
                    vm.bills = vm.bills.concat(response.data.results);
                }, function(error) {
                    vm.loadingInformation = false;
                    vm.hasLoadError = true;
            });
        }

        vm.onSearch = function() {
            if (vm.searchTerm === null || vm.searchTerm.trim() === "") {
                $location.url("/bills");
            } else {
                $location.url("/bills?q=" + vm.searchTerm);
            }
        }

        vm.onKeyPress = function(ev) {
            if (ev.keyCode === 13) {
                vm.onSearch();
            }
        }

        vm.refreshPage = function() {
            $route.reload();
        }
    }
})();