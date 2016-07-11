"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, $filter, $location, $window) {
        var vm = this;
        vm.allLegislators = [];
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
        	LegislatorService.getAllCurrentLegislators()
        	.then(function(response) {
        		vm.allLegislators = response.data.results;
                vm.displayedLegislators = vm.allLegislators;
                vm.displayedLegislatorsCount = vm.allLegislators.length;
                vm.sortBy = "last_name";
        	}, function(error) {
        		console.log(error);
        	});
        }

        init();

        vm.updateFilteredParties = function(party, isIn) {
            updateFilterArray(party, vm.filteredParties, isIn);
        }

        vm.updateFilteredChambers = function(chamber, isIn) {
            updateFilterArray(chamber, vm.filteredChambers, isIn);
        }

        vm.updateFilteredStates = function(state, isIn) {
            updateFilterArray(state, vm.filteredStates, isIn);
        }

        vm.filterLegislators = function() {
            var filterArrays = [vm.filteredParties, vm.filteredChambers, vm.filteredStates];
            var filterArrayOptions = [vm.partyCheckboxes, vm.chamberCheckboxes, vm.stateCheckboxes];
            var filterProperties = ["party", "chamber", "state_name"];
            var intermediateLegislatorsArray = vm.allLegislators;

            for (var index = 0; index < filterArrays.length;  index++) {
                var currentFilterArray = filterArrays[index];
                if (currentFilterArray.length === 0 || currentFilterArray.length === filterArrayOptions[index].length) {
                    continue;
                }

                intermediateLegislatorsArray = $filter('filter')(intermediateLegislatorsArray, function(value, ind, array) {
                    var valueOfInterest = value[filterProperties[index]];
                    return currentFilterArray.indexOf(valueOfInterest) != -1;
                });
            }

            vm.displayedLegislators = intermediateLegislatorsArray;
            vm.sortLegislators(vm.sortBy);
            vm.displayedLegislatorsCount = intermediateLegislatorsArray.length;
        }

        vm.clearPartyFilters = function() {
            uncheckCheckboxes(vm.partyCheckboxes);
            vm.filteredParties = [];
        }

        vm.clearAllFilters = function() {
            vm.clearPartyFilters();
            vm.clearChamberFilters();
            vm.clearStateFilters();
        }

        vm.onLegislatorClick = function(legislatorId) {
            $location.url("/legislator/" + legislatorId);
        }

        vm.sortLegislators = function(sortingCriteria) {
            vm.displayedLegislators = $filter('orderBy')(vm.displayedLegislators, sortingCriteria);
            $window.scrollTo(0,0);
        }

        /* Helper methods */
        function updateFilterArray(value, arrayOfValues, isIn) {
            if (isIn) {
                arrayOfValues.push(value);
            } else {
                var index = arrayOfValues.indexOf(value);
                if (index >= 0) {
                    arrayOfValues.splice(index, 1);
                }
            }
        }

        function uncheckCheckboxes(checkboxesArray) {
            for (var index = 0; index < checkboxesArray.length; index++) {
                checkboxesArray[index].isChecked = false;
            }
        }

    }
})();