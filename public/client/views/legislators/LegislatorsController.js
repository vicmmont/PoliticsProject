"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, $filter, $location, $routeParams, $window, $mdDialog) {
        var vm = this;
        vm.displayedLegislators = [];
        vm.displayedLegislatorsCount = 0;
        vm.filteredParties = [];
        vm.filteredChambers = [];
        vm.filteredStates = [];
        vm.sortBy;

        vm.partyCheckboxes = [
            { isChecked: false, value: "D", displayValue: "Democrat" },
            { isChecked: false, value: "R", displayValue: "Republican" },
            { isChecked: false, value: "I", displayValue: "Independent" }
        ];

        vm.chamberCheckboxes = [
            { isChecked: false, value: "senate", displayValue: "Senate"},
            { isChecked: false, value: "house",  displayValue: "House of Representatives"}
        ];

        vm.stateCheckboxes = [
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

        function init() {
            vm.filteredParties = ($routeParams["parties"] === undefined) ? [] : $routeParams["parties"].split(",");
            vm.filteredChambers = ($routeParams["chambers"] === undefined) ? [] : $routeParams["chambers"].split(",");
            vm.filteredStates = ($routeParams["states"] === undefined) ? [] : $routeParams["states"].split(",");
            updateCheckBoxes();
            
            vm.sortBy = ($routeParams["order"] === undefined) ? "last_name__asc" : validateOrderBy($routeParams["order"]);

            LegislatorService.getCurrentLegislators(packageUrlParameters())
                .then(function(response) {
               	    vm.displayedLegislators = response.data.results;
                    vm.displayedLegislatorsCount = vm.displayedLegislators.length;
                    $window.scrollTo(0,0);
                }, function(error) {
               	    console.log(error);
                });
        }

        init();

        vm.updateFilteredParties = function(party, isIn) {
            updateFilterArray(party, vm.filteredParties, isIn);
            $location.url(formRoute());
        }

        vm.updateFilteredChambers = function(chamber, isIn) {
            updateFilterArray(chamber, vm.filteredChambers, isIn);
            $location.url(formRoute());
        }

        vm.updateFilteredStates = function(state, isIn) {
            updateFilterArray(state, vm.filteredStates, isIn);
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
            var filters = [
                {name: "parties",  values: vm.filteredParties},
                {name: "chambers", values: vm.filteredChambers},
                {name: "states",   values: vm.filteredStates}
            ];

            var urlPackage = {};

            for (var index = 0; index < filters.length; index++) {
                var currentFilter = filters[index];
                if (currentFilter.values.length > 0) {
                    urlPackage[currentFilter.name] = currentFilter.values;
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

            if (vm.filteredParties.length > 0) {
                route = route.concat(separator + "parties=").concat(vm.filteredParties.join(","));
                separator = "&";
            }
            if (vm.filteredChambers.length > 0) {
                route = route.concat(separator + "chambers=").concat(vm.filteredChambers.join(","));
                separator = "&";
            }
            if (vm.filteredStates.length > 0) {
                route = route.concat(separator + "states=").concat(vm.filteredStates.join(","));
                separator = "&";
            }
            if (vm.sortBy != "last_name__asc") {
                route = route.concat(separator + "order=" + vm.sortBy);
            }

            return route;
        }

        function updateFilterArray(value, arrayOfValues, isIn) {
            if (isIn) {
                var index;
                for (index = 0; index < arrayOfValues.length; index++) {
                    if (value <= arrayOfValues[index]) {
                        console.log(value + "is less than " + arrayOfValues[index]);
                        break;
                    }
                }

                arrayOfValues.splice(index, 0, value);
            } else {
                var index = arrayOfValues.indexOf(value);
                if (index >= 0) {
                    arrayOfValues.splice(index, 1);
                }
            }
        }

        function validateOrderBy(orderBy) {
            if (orderBy === "last_name__desc") {
                return orderBy;
            } else {
                return "last_name__asc";
            }
        }

        function updateCheckBoxes() {
            var checkBoxLists = [vm.partyCheckboxes, vm.chamberCheckboxes, vm.stateCheckboxes];
            var filters = [vm.filteredParties, vm.filteredChambers, vm.filteredStates];

            for (var listIndex = 0; listIndex < filters.length; listIndex++) {
                var currentCheckBoxList = checkBoxLists[listIndex];
                var currentFilter = filters[listIndex];

                for (var checkBoxIndex = 0; checkBoxIndex < currentCheckBoxList.length; checkBoxIndex++) {
                    var currentCheckBox = currentCheckBoxList[checkBoxIndex];
                    if (currentFilter.includes(currentCheckBox.value)) {
                        currentCheckBox.isChecked = true;
                    }
                }    
            }
            
        }


        /* Dialog Popup */
        vm.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: "LegislatorsFilterDialogController",
                templateUrl: './client/views/legislators/legislatorsFilterDialog.html',
                controllerAs: "model",
                parent: angular.element(document.body),
                locals: {
                    "filters": {
                        "parties" : vm.partyCheckboxes,
                        "chambers" : vm.chamberCheckboxes,
                        "states" : vm.stateCheckboxes
                    }
                },
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            })
            .then(function(answer) {
                console.log("Your answer was" + answer);
            }, function() {
                console.log("You canceled the dialog");;
            });
        }


    }
})();