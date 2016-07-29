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

        function init() {
            vm.sortBy = ($routeParams["order"] === undefined) ? "last_name__asc" : validateOrderBy($routeParams["order"]);

            LegislatorService.getCurrentLegislators($routeParams)
                .then(function(response) {
                    console.log("making init call");
               	    vm.displayedLegislators = response.data.results;
                    $window.scrollTo(0,0);
                }, function(error) {
               	    console.log(error);
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

        /* Helper methods */
        function validateOrderBy(orderBy) {
            if (orderBy === "last_name__desc") {
                return orderBy;
            } else {
                return "last_name__asc";
            }
        }

        /* Dialog Popup */
        vm.showFilterPopup = function(ev) {
            $mdDialog.show({
                controller: "LegislatorsFilterDialogController",
                templateUrl: './client/views/legislators/legislatorsFilterDialog.html',
                controllerAs: "model",
                parent: angular.element(document.body),
                locals: {
                    "filterGroups": vm.filterGroups
                },
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            })
            .then(function(filterGroups) {
                vm.filterGroups = filterGroups;

                $location.url(formRoute());
            }, function() {
                console.log("You canceled the dialog");;
            });
        }
    }
})();