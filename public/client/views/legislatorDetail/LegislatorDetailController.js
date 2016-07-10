"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorDetailController", legislatorDetailController);

    function legislatorDetailController(LegislatorService, $routeParams, $location) {
        var vm = this;
        vm.currentLegislatorId = $routeParams["legislatorId"];
        vm.currentLegislator = null;
        vm.repDistrictOrdinalSuffix = null;
        vm.age = null;

        function init() {
            LegislatorService
                .getLegislatorById(vm.currentLegislatorId)
                .then(function(response){
                    vm.currentLegislator = response.data.results[0];
                    setDistrictOrdinalSuffix(vm.currentLegislator.district);
                    setLegislatorAge(vm.currentLegislator.birthday);
                }, function(error){
                    console.log("Error retrieving single legislator");
                    return;
                });
        }

        init();

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