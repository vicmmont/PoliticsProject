"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, FilterService, $filter, $location, $routeParams, $window, $mdDialog, $route) {
        var vm = this;
        vm.route = $routeParams;
        vm.sortBy;
        vm.displayedLegislators = [];
        vm.hasError = false;
        vm.hasNoResults = false;

        function init() {
            vm.sortBy = ($routeParams["order"] === undefined) ? "last_name__asc" : validateOrderBy($routeParams["order"]);

            LegislatorService.getCurrentLegislators($routeParams)
                .then(function(response) {
                    if (response.data.results.length === 0) {
                        vm.hasNoResults = true;
                    }

               	    vm.displayedLegislators = response.data.results;
                    $window.scrollTo(0,0);
                }, function(error) {
               	    vm.hasError = true;
                });
        }

        init();

        vm.onLegislatorClick = function(legislatorId) {
            $location.url("/legislator/" + legislatorId);
        }

        vm.sortLegislators = function() {
            var filters = [];
            if (vm.sortBy != 'last_name__asc') {
                filters.push({urlName : "order", value : vm.sortBy});
            }
            var routeParams = FilterService.extractRouteParametersUniqueParams(filters, $routeParams, $location.path());

            $location.search(routeParams);
        }

        vm.refreshPage = function() {
            $route.reload();
        }

        /* Dialog Popup */
        vm.showFilterPopup = function(ev) {
            var filterGroups = FilterService.getFilterGroups($location.path(), $routeParams);

            FilterService.showFilterPopup(ev, filterGroups)
                .then(function(newFilterGroups) {
                    filterGroups = newFilterGroups;
                    var routeParams = FilterService.extractRouteParameters(filterGroups, $routeParams, $location.path());
                    $location.search(routeParams);
                }, function() {
                    console.log("You canceled the dialog");;
                });
        }

        /* Helper methods */
        function validateOrderBy(orderBy) {
            if (orderBy === "last_name__desc") {
                return orderBy;
            } else {
                return "last_name__asc";
            }
        }


    }
})();