"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(FilterService, LegislatorService, $filter, $location, $mdDialog, $route, $routeParams, $window) {
        var vm = this;
        vm.route = $routeParams;
        vm.sortBy;
        vm.displayedLegislators = [];
        vm.currentFilters = "";
        vm.selectedFilters = "";

        vm.hasError = false;
        vm.hasNoResults = false;
        vm.loadingInformation = false;

        function init() {
            vm.sortBy = ($routeParams["order"] === undefined) ? "last_name__asc" : validateOrderBy($routeParams["order"]);

            vm.loadingInformation = true;
            LegislatorService.getCurrentLegislators($routeParams)
                .then(function(response) {
                    if (response.data.results.length === 0) {
                        vm.hasNoResults = true;
                    }

                    vm.loadingInformation = false;
               	    vm.displayedLegislators = response.data.results;

                    var filterGroups = FilterService.getFilterGroups($location.path(), $routeParams);
                    vm.selectedFilters = FilterService.getSelectedFilters(filterGroups);
                    $window.scrollTo(0,0);
                }, function(error) {
               	    vm.hasError = true;
                });
        }

        init();

        vm.onLegislatorClick = function(legislatorId) {
            $location.url("/legislator/" + legislatorId);
        }


        vm.showFilterPopup = function(ev) {
            var filterGroups = FilterService.getFilterGroups($location.path(), $routeParams);

            FilterService.showFilterPopup(ev, filterGroups)
                .then(function(newFilterGroups) {
                    filterGroups = newFilterGroups;
                    var routeParams = FilterService.extractRouteParameters(filterGroups, $routeParams, $location.path());
                    $location.search(routeParams);
                });
        }

        vm.showSortPopup = function(ev) {
            var sorters = FilterService.getSorters($location.path(), $routeParams);

            FilterService.showSortPopup(ev, sorters)
                .then(function(selectedSorter) {
                    sorters = [];
                    sorters.push({urlName: "order", value: selectedSorter.value});
                    var routeParams = FilterService.extractRouteParametersUniqueParams(sorters, $routeParams, $location.path());
                    $location.search(routeParams);
                });
        }

        vm.sortLegislators = function() {
            var sorters = [];
            if (vm.sortBy != 'last_name__asc') {
                sorters.push({urlName: "order", value: vm.sortBy});
            }
            var routeParams = FilterService.extractRouteParametersUniqueParams(sorters, $routeParams, $location.path());

            $location.search(routeParams);
        }

        vm.refreshPage = function() {
            $route.reload();
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