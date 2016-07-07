"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController(LegislatorService, $filter) {
        var vm = this;
        vm.allLegislators = [];
        vm.displayedLegislators = [];

        vm.filteredParties = [];
        vm.filteredChambers = [];
        vm.filteredStates = [];

        vm.partyCheckboxes = [
            { modelBinding: "model.democrat",    value: "D", displayValue: "Democrat" },
            { modelBinding: "model.republican",  value: "R", displayValue: "Republican" },
            { modelBinding: "model.independent", value: "I", displayValue: "Independent" }
        ];

        vm.chamberCheckboxes = [
            { modelBinding: "model.senate", value: "senate", displayValue: "Senate"},
            { modelBinding: "model.house",  value: "house",  displayValue: "House of Representatives"}
        ];

        vm.stateCheckboxes = [
            { modelBinding: "model.alabama",            value: "Alabama",               displayValue: "Alabama" },
            { modelBinding: "model.alaska",             value: "Alaska",                displayValue: "Alaska" },
            { modelBinding: "model.americanSamoa",      value: "American Samoa",        displayValue: "American Samoa" },
            { modelBinding: "model.arizona",            value: "Arizona",               displayValue: "Arizona" },
            { modelBinding: "model.arkansas",           value: "Arkansas",              displayValue: "Arkansas" },
            { modelBinding: "model.california",         value: "California",            displayValue: "California" },
            { modelBinding: "model.colorado",           value: "Colorado",              displayValue: "Colorado" },
            { modelBinding: "model.connecticut",        value: "Connecticut",           displayValue: "Connecticut" },
            { modelBinding: "model.districtOfColumbia", value: "District of Columbia",  displayValue: "District of Columbia" },
            { modelBinding: "model.delaware",           value: "Delaware",              displayValue: "Delaware" },
            { modelBinding: "model.florida",            value: "Florida",               displayValue: "Florida" },
            { modelBinding: "model.georgia",            value: "Georgia",               displayValue: "Georgia" },
            { modelBinding: "model.guam",               value: "Guam",                  displayValue: "Guam" },
            { modelBinding: "model.hawaii",             value: "hawaii",                displayValue: "Hawaii" },
            { modelBinding: "model.idaho",              value: "Idaho",                 displayValue: "Idaho" },
            { modelBinding: "model.illinois",           value: "Illinois",              displayValue: "Illinois" },
            { modelBinding: "model.indiana",            value: "Indiana",               displayValue: "Indiana" },
            { modelBinding: "model.iowa",               value: "Iowa",                  displayValue: "Iowa" },
            { modelBinding: "model.kansas",             value: "Kansas",                displayValue: "Kansas" },
            { modelBinding: "model.kentucky",           value: "Kentucky",              displayValue: "Kentucky" },
            { modelBinding: "model.louisiana",          value: "Louisiana",             displayValue: "Louisiana" },
            { modelBinding: "model.maine",              value: "Maine",                 displayValue: "Maine" },
            { modelBinding: "model.maryland",           value: "Maryland",              displayValue: "Maryland" },
            { modelBinding: "model.massachusetts",      value: "Massachusetts",         displayValue: "Massachusetts" },
            { modelBinding: "model.michigan",           value: "Michigan",              displayValue: "Michigan" },
            { modelBinding: "model.minnesota",          value: "Minnesota",             displayValue: "Minnesota" },
            { modelBinding: "model.mississippi",        value: "Mississippi",           displayValue: "Mississippi" },
            { modelBinding: "model.missouri",           value: "Missouri",              displayValue: "Missouri" },
            { modelBinding: "model.montana",            value: "Montana",               displayValue: "Montana" },
            { modelBinding: "model.nebraska",           value: "Nebraska",              displayValue: "Nebraska" },
            { modelBinding: "model.nevada",             value: "Nevada",                displayValue: "Nevada" },
            { modelBinding: "model.newHampshire",       value: "New Hampshire",         displayValue: "New Hampshire" },
            { modelBinding: "model.newJersey",          value: "New Jersey",            displayValue: "New Jersey" },
            { modelBinding: "model.newMexico",          value: "New Mexico",            displayValue: "New Mexico" },
            { modelBinding: "model.newYork",            value: "New York",              displayValue: "New York" },
            { modelBinding: "model.northCarolina",      value: "North Carolina",        displayValue: "North Carolina" },
            { modelBinding: "model.northDakota",        value: "North Dakota",          displayValue: "North Dakota" },
            { modelBinding: "model.ohio",               value: "Ohio",                  displayValue: "Ohio" },
            { modelBinding: "model.oklahoma",           value: "Oklahoma",              displayValue: "Oklahoma" },
            { modelBinding: "model.oregon",             value: "Oregon",                displayValue: "Oregon" },
            { modelBinding: "model.pennsylvania",       value: "Pennsylvania",          displayValue: "Pennsylvania" },
            { modelBinding: "model.puertoRico",         value: "Puerto Rico",           displayValue: "Puerto Rico" },
            { modelBinding: "model.rhodeIsland",        value: "Rhode Island",          displayValue: "Rhode Island" },
            { modelBinding: "model.southCarolina",      value: "South Carolina",        displayValue: "South Carolina" },
            { modelBinding: "model.southDakota",        value: "South Dakota",          displayValue: "South Dakota" },
            { modelBinding: "model.tennessee",          value: "Tennessee",             displayValue: "Tennessee" },
            { modelBinding: "model.texas",              value: "Texas",                 displayValue: "Texas" },
            { modelBinding: "model.utah",               value: "Utah",                  displayValue: "Utah" },
            { modelBinding: "model.usVirginIslands",    value: "US Virgin Islands",     displayValue: "US Virgin Islands" },
            { modelBinding: "model.vermont",            value: "Vermont",               displayValue: "Vermont" },
            { modelBinding: "model.virginia",           value: "Virginia",              displayValue: "Virginia" },
            { modelBinding: "model.washington",         value: "Washington",            displayValue: "Washington" },
            { modelBinding: "model.westVirginia",       value: "West Virginia",         displayValue: "West Virginia" },
            { modelBinding: "model.wisconsin",          value: "Wisconsin",             displayValue: "Wisconsin" },
            { modelBinding: "model.wyoming",            value: "Wyoming",               displayValue: "Wyoming" }
        ];

        /* Filter Variables */
        //Party
        vm.democrat = false;
        vm.depublican = false;
        vm.independent = false;
        //Chamber
        vm.senate = false;
        vm.house = false;
        //States
        vm.alabama = false;
        vm.alaska  = false;
        vm.americanSamoa = false;
        vm.arizona = false;
        vm.arkansas = false;
        vm.california = false;
        vm.colorado = false;
        vm.connecticut = false;
        vm.districtOfColumbia = false;
        vm.delaware = false;
        vm.florida = false;
        vm.georgia = false;
        vm.guam = false;
        vm.hawaii = false;
        vm.idaho = false;
        vm.illinois = false;
        vm.indiana = false;
        vm.iowa = false;
        vm.kansas = false;
        vm.kentucky = false;
        vm.louisiana = false;
        vm.maine = false;
        vm.maryland = false;
        vm.massachusetts = false;
        vm.michigan = false;
        vm.minnesota = false;
        vm.mississippi = false;
        vm.missouri = false;
        vm.montana = false;
        vm.nebraska = false;
        vm.nevada = false;
        vm.newHampshire = false;
        vm.newJersey = false;
        vm.newMexico = false;
        vm.newYork = false;
        vm.northCarolina = false;
        vm.northDakota = false;
        vm.ohio = false;
        vm.oklahoma = false;
        vm.oregon = false;
        vm.pennsylvania = false;
        vm.puertoRico = false;
        vm.rhodeIsland = false;
        vm.southCarolina = false;
        vm.southDakota = false;
        vm.tennessee = false;
        vm.texas = false;
        vm.utah = false;
        vm.usVirginIslands = false;
        vm.vermont = false;
        vm.virginia = false;
        vm.washington = false;
        vm.westVirginia = false;
        vm.wisconsin = false;
        vm.wyoming = false;

        function init() {
        	LegislatorService.getAllCurrentLegislators()
        	.then(function(response) {
        		vm.allLegislators = response.data.results;
                vm.displayedLegislators = vm.allLegislators;
        	}, function(error) {
        		console.log(error);
        	})
        }

        init();

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

        vm.updateFilteredParties = function(party, isIn) {
            updateFilterArray(party, vm.filteredParties, isIn);
        }

        vm.updateFilteredChambers = function(chamber, isIn) {
            updateFilterArray(chamber, vm.filteredChambers, isIn);
        }

        vm.updateFilteredStates = function(state, isIn) {
            updateFilterArray(state, vm.filteredStates, isIn);
        }

        vm.filterLegislators = function(){
            console.log("filtering legislators");
            var filterArrays = [vm.filteredParties, vm.filteredChambers, vm.filteredStates];
            var filterArrayOptions = [vm.partyCheckboxes, vm.chamberCheckboxes, vm.stateCheckboxes];
            var filterProperties = ["party", "chamber", "state_name"];
            var intermediateLegislatorsArray = vm.allLegislators;

            for (var index = 0; index < filterArrays.length;  index++) {
                var currentFilterArray = filterArrays[index];
                if (currentFilterArray.length === 0 || currentFilterArray.length === filterArrayOptions[index].length) {
                    console.log("did not filter on this iteration");
                    continue;
                }

                intermediateLegislatorsArray = $filter('filter')(intermediateLegislatorsArray, function(value, ind, array) {
                    var valueOfInterest = value[filterProperties[index]];
                    console.log("property is: " + filterProperties[index]);
                    console.log("value of interest is: " + valueOfInterest);
                    return currentFilterArray.indexOf(valueOfInterest) != -1;
                });
            }

            vm.displayedLegislators = intermediateLegislatorsArray;
            console.log("final number of legislators is:" + intermediateLegislatorsArray.length);
        }
    }
})();