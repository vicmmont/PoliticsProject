"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, $filter, $location, $routeParams, $window, $mdDialog) {
        var vm = this;
        var partyCheckboxes = [
            { isChecked: false, value: "D", displayValue: "Democrat" },
            { isChecked: false, value: "R", displayValue: "Republican" },
            { isChecked: false, value: "I", displayValue: "Independent" }
        ];

        var chamberCheckboxes = [
            { isChecked: false, value: "senate", displayValue: "Senate"},
            { isChecked: false, value: "house",  displayValue: "House of Representatives"}
        ];

        var stateCheckboxes = [
            { isChecked: false,  value: "Alabama",               displayValue: "Alabama" },
            { isChecked: false,  value: "Alaska",                displayValue: "Alaska" },
            { isChecked: false,  value: "American Samoa",        displayValue: "American Samoa" },
            { isChecked: false,  value: "Arizona",               displayValue: "Arizona" },
            { isChecked: false,  value: "Arkansas",              displayValue: "Arkansas" },
            { isChecked: false,  value: "California",            displayValue: "California" },
            { isChecked: false,  value: "Colorado",              displayValue: "Colorado" },
            { isChecked: false,  value: "Connecticut",           displayValue: "Connecticut" },
            { isChecked: false,  value: "District of Columbia",  displayValue: "District of Columbia" },
            { isChecked: false,  value: "Delaware",              displayValue: "Delaware" },
            { isChecked: false,  value: "Florida",               displayValue: "Florida" },
            { isChecked: false,  value: "Georgia",               displayValue: "Georgia" },
            { isChecked: false,  value: "Guam",                  displayValue: "Guam" },
            { isChecked: false,  value: "hawaii",                displayValue: "Hawaii" },
            { isChecked: false,  value: "Idaho",                 displayValue: "Idaho" },
            { isChecked: false,  value: "Illinois",              displayValue: "Illinois" },
            { isChecked: false,  value: "Indiana",               displayValue: "Indiana" },
            { isChecked: false,  value: "Iowa",                  displayValue: "Iowa" },
            { isChecked: false,  value: "Kansas",                displayValue: "Kansas" },
            { isChecked: false,  value: "Kentucky",              displayValue: "Kentucky" },
            { isChecked: false,  value: "Louisiana",             displayValue: "Louisiana" },
            { isChecked: false,  value: "Maine",                 displayValue: "Maine" },
            { isChecked: false,  value: "Maryland",              displayValue: "Maryland" },
            { isChecked: false,  value: "Massachusetts",         displayValue: "Massachusetts" },
            { isChecked: false,  value: "Michigan",              displayValue: "Michigan" },
            { isChecked: false,  value: "Minnesota",             displayValue: "Minnesota" },
            { isChecked: false,  value: "Mississippi",           displayValue: "Mississippi" },
            { isChecked: false,  value: "Missouri",              displayValue: "Missouri" },
            { isChecked: false,  value: "Montana",               displayValue: "Montana" },
            { isChecked: false,  value: "Nebraska",              displayValue: "Nebraska" },
            { isChecked: false,  value: "Nevada",                displayValue: "Nevada" },
            { isChecked: false,  value: "New Hampshire",         displayValue: "New Hampshire" },
            { isChecked: false,  value: "New Jersey",            displayValue: "New Jersey" },
            { isChecked: false,  value: "New Mexico",            displayValue: "New Mexico" },
            { isChecked: false,  value: "New York",              displayValue: "New York" },
            { isChecked: false,  value: "North Carolina",        displayValue: "North Carolina" },
            { isChecked: false,  value: "North Dakota",          displayValue: "North Dakota" },
            { isChecked: false,  value: "Ohio",                  displayValue: "Ohio" },
            { isChecked: false,  value: "Oklahoma",              displayValue: "Oklahoma" },
            { isChecked: false,  value: "Oregon",                displayValue: "Oregon" },
            { isChecked: false,  value: "Pennsylvania",          displayValue: "Pennsylvania" },
            { isChecked: false,  value: "Puerto Rico",           displayValue: "Puerto Rico" },
            { isChecked: false,  value: "Rhode Island",          displayValue: "Rhode Island" },
            { isChecked: false,  value: "South Carolina",        displayValue: "South Carolina" },
            { isChecked: false,  value: "South Dakota",          displayValue: "South Dakota" },
            { isChecked: false,  value: "Tennessee",             displayValue: "Tennessee" },
            { isChecked: false,  value: "Texas",                 displayValue: "Texas" },
            { isChecked: false,  value: "Utah",                  displayValue: "Utah" },
            { isChecked: false,  value: "US Virgin Islands",     displayValue: "US Virgin Islands" },
            { isChecked: false,  value: "Vermont",               displayValue: "Vermont" },
            { isChecked: false,  value: "Virginia",              displayValue: "Virginia" },
            { isChecked: false,  value: "Washington",            displayValue: "Washington" },
            { isChecked: false,  value: "West Virginia",         displayValue: "West Virginia" },
            { isChecked: false,  value: "Wisconsin",             displayValue: "Wisconsin" },
            { isChecked: false,  value: "Wyoming",               displayValue: "Wyoming" }
        ];

        vm.displayedLegislators = [];
        vm.filterGroups = [
            { name : "Party",   urlName : "parties",    filters : partyCheckboxes,   },
            { name : "Chamber", urlName : "chambers",   filters : chamberCheckboxes, },
            { name : "State",   urlName : "states",     filters : stateCheckboxes,   }
        ];
        vm.sortBy;

        function init() {
            var partyFilters = ($routeParams["parties"] === undefined) ? [] : $routeParams["parties"].split(",");
            var chamberFilters = ($routeParams["chambers"] === undefined) ? [] : $routeParams["chambers"].split(",");
            var stateFilters = ($routeParams["states"] === undefined) ? [] : $routeParams["states"].split(",");
            var selectedFilters = {
                "Party" : partyFilters,
                "Chamber" : chamberFilters,
                "State" : stateFilters
            };

            updateCheckBoxes(selectedFilters);
            
            vm.sortBy = ($routeParams["order"] === undefined) ? "last_name__asc" : validateOrderBy($routeParams["order"]);

            LegislatorService.getCurrentLegislators(packageUrlParameters())
                .then(function(response) {
               	    vm.displayedLegislators = response.data.results;
                    $window.scrollTo(0,0);
                }, function(error) {
               	    console.log(error);
                });
        }

        init();

        vm.filterLegislators = function() {
            $location.url(formRoute());
        }

        vm.onLegislatorClick = function(legislatorId) {
            $location.url("/legislator/" + legislatorId);
        }

        vm.sortLegislators = function() {
            $location.url(formRoute());
        }

        /* Helper methods */
        function packageUrlParameters() {
            var urlPackage = {};

            for (var index = 0; index < vm.filterGroups.length; index++) {
                var currentFilterGroup = vm.filterGroups[index];
                var currentSelectedFilters = getListofSelectedValues(currentFilterGroup.filters);
                
                if (currentSelectedFilters != "") {
                    urlPackage[currentFilterGroup.urlName] = currentSelectedFilters;
                }
            }

            if (vm.sortBy != "last_name__asc") {
                urlPackage.order = vm.sortBy;
            }

            return urlPackage;
        }

        function formRoute() {
            var separator = "?";
            var route = "/legislators";

            for (var index = 0; index < vm.filterGroups.length; index++) {
                var currentFilterGroup = vm.filterGroups[index];
                var currentSelectedFilters = getListofSelectedValues(currentFilterGroup.filters);

                if (currentSelectedFilters != "") {
                    route = route + separator + currentFilterGroup.urlName + "=" + currentSelectedFilters;
                    separator = "&";
                }
            }

            if (vm.sortBy != "last_name__asc") {
                route = route.concat(separator + "order=" + vm.sortBy);
            }

            return route;
        }

        function validateOrderBy(orderBy) {
            if (orderBy === "last_name__desc") {
                return orderBy;
            } else {
                return "last_name__asc";
            }
        }

        function updateCheckBoxes(selectedFilters) {
            for (var index = 0; index < vm.filterGroups.length; index++) {
                var currentFilterGroup = vm.filterGroups[index];
                var name = currentFilterGroup.name;
                var currentFilters = currentFilterGroup.filters;
                var currentSelectedFilters = selectedFilters[name];

                if (currentSelectedFilters.length === 0) {
                    continue;
                } else {
                    for (var ind = 0; ind < currentFilters.length; ind++) {
                        var currentIndividualFilter = currentFilters[ind];
                        if (currentSelectedFilters.includes(currentIndividualFilter.value)) {
                            currentIndividualFilter.isChecked = true;
                        }
                    }
                }
            }            
        }

        function getListofSelectedValues(availableFilters) {
            var result = "";

            for (var index = 0; index < availableFilters.length; index++) {
                var currentFilter = availableFilters[index];
                if (currentFilter.isChecked) {
                    if (result === "") {
                        result = currentFilter.value;
                    } else {
                        result = result + "," + currentFilter.value;
                    }
                }
            }

            return result;
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