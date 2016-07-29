"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorDetailController", legislatorDetailController);

    function legislatorDetailController(LegislatorService, BillService, VoteService, $routeParams, $location) {
        var vm = this;
        vm.currentLegislatorId = $routeParams["legislatorId"];
        vm.currentLegislator = null;
        vm.repDistrictOrdinalSuffix = null;
        vm.age = null;

        vm.currentSubView = "sponsoredBills";
        vm.pageSize = 32;
        vm.information = {};
        vm.information.sponsoredBills = { data: [], totalCount: 0, method: BillService.getBillsByLegislatorId};
        vm.information.cosponsoredBills = {data: [], totalCount: 0, method: BillService.getBillsByLegislatorId};
        vm.information.votes = {data: [], totalCount: 0, method: VoteService.getVotesByLegislatorId};

        function init() {
            LegislatorService
                .getLegislatorById(vm.currentLegislatorId)
                .then(function(response){
                    vm.currentLegislator = response.data.results[0];
                    setDistrictOrdinalSuffix(vm.currentLegislator.district);
                    setLegislatorAge(vm.currentLegislator.birthday);

                    vm.getMoreSubViewData(vm.pageSize);
                }, function(error){
                    console.log("Error retrieving single legislator");
                    return;
                });
        }

        init();

        vm.getMoreSubViewData = function(dataCount) {
            var currentSubViewData = vm.information[vm.currentSubView].data;
            var getDataFunction = vm.information[vm.currentSubView].method;
            var pageNumber = 0;

            if (dataCount != vm.pageSize) {
                pageNumber = currentSubViewData.length / dataCount; 
                
                if (dataCount > vm.pageSize && pageNumber % 1 != 0) {
                    pageNumber = currentSubViewData.length / vm.pageSize;
                } else {
                    vm.pageSize = dataCount; 
                }
            } else {
                pageNumber = currentSubViewData.length / vm.pageSize;
            }

            pageNumber += 1;
            getDataFunction(vm.currentLegislatorId, vm.currentSubView, vm.pageSize, pageNumber)
                    .then(function(response) {
                        vm.information[vm.currentSubView].data = vm.information[vm.currentSubView].data.concat(response.data.results);
                        if (vm.information[vm.currentSubView].totalCount === 0) {
                            vm.information[vm.currentSubView].totalCount = response.data.count;
                        }
                    }, function(error) {
                        console.log("error!");
                    });
        }

        vm.setSubView = function(view) {
            vm.currentSubView = view;

            if (vm.information[vm.currentSubView].data.length === 0) {
                vm.getMoreSubViewData(vm.pageSize);
            }
        }

        vm.onBillClick = function(billId) {
            $location.url("/bill/" + billId);
        }

        vm.onVoteClick = function(voteId) {
            $location.url("/vote/" + voteId);
        }

        function setDistrictOrdinalSuffix(districtNumber) {
            if (districtNumber == null || districtNumber === 0) {
                return;
            }

            if (districtNumber === 11 || districtNumber === 12 || districtNumber === 13) {
                vm.repDistrictOrdinalSuffix = "th";
                return;
            }

            var onesDigit = districtNumber % 10;
            
            if (onesDigit === 1) {
                vm.repDistrictOrdinalSuffix = "st";
            } else if (onesDigit === 2) {
                vm.repDistrictOrdinalSuffix = "nd";
            } else if (onesDigit === 3) {
                vm.repDistrictOrdinalSuffix = "rd";
            } else {
                vm.repDistrictOrdinalSuffix = "th";
            }
        }

        //takes date of format YYYY-MM-DD
        function setLegislatorAge(birthdate) {
            if (birthdate == null) {
                return;
            }

            var year = parseInt(birthdate.substring(0,4));
            var month = parseInt(birthdate.substring(5,7));
            var day = parseInt(birthdate.substring(8,10));
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();

            var age = currentYear - year;
            if (currentMonth <= month && currentDay < day) {
                age -= 1;
            }

            vm.age = age;    
        }
    }
})();