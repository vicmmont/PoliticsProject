"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, $filter) {
        var vm = this;
        vm.legislators = [];
        vm.displayedLegislators = [];
        vm.filterBy;
        vm.sortBy;

        function init() {
        	LegislatorService.getAllCurrentLegislators()
        	.then(function(response) {
        		vm.legislators = response.data.results;
                vm.displayedLegislators = vm.legislators;
        	}, function(error) {
        		console.log(error);
        	})
        }

        init();

        vm.filterLegislators = function(filterExpression){
            if (filterExpression === "") {
                vm.displayedLegislators = vm.legislators;
            } else if (filterExpression === "party-O") {
                vm.displayedLegislators = $filter('filter')(vm.legislators, function(value, index, array) {
                    return value.party != "R" && value.party != "D";
                });
            } else if (filterExpression === "title-Rep") {
                vm.displayedLegislators = $filter('filter')(vm.legislators, function(value, index, array) {
                    return value.title != "Sen";
                });
            } else {
                var filterObject = {};
                var filterVals = filterExpression.split("-");

                //Error handling
                if (filterVals.length != 2) {
                    return;
                }

                var filterProperty = filterVals[0];
                var filterValue = filterVals[1];
                filterObject[filterProperty] = filterValue;
                vm.displayedLegislators = $filter('filter')(vm.legislators, filterObject);
            }
        }

        vm.sortLegislators = function(sortExpression) {
            if (sortExpression === "") {
                vm.displayedLegislators = vm.legislators;
            } else {
                vm.displayedLegislators = $filter("orderBy")(vm.legislators, sortExpression);
            }
        }
    }
})();