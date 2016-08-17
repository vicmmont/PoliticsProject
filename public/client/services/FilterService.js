"use strict";
(function() {
	angular
		.module("MyPoliticsApp")
		.service("FilterService", filterService);

	function filterService($mdDialog) {
        var partyFilters = [
            { isChecked: false, value: "D", displayValue: "Democrat" },
            { isChecked: false, value: "R", displayValue: "Republican" },
            { isChecked: false, value: "I", displayValue: "Independent" }
        ];
        var chamberFilters = [
            { isChecked: false, value: "senate", displayValue: "Senate"},
            { isChecked: false, value: "house",  displayValue: "House of Representatives"}
        ];
        var stateFilters = [
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
            { isChecked: false,  value: "Hawaii",                displayValue: "Hawaii" },
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
        var legislatorFilterGroups = [
            { name : "Party",   urlName : "parties",    filters : partyFilters   },
            { name : "Chamber", urlName : "chambers",   filters : chamberFilters },
            { name : "State",   urlName : "states",     filters : stateFilters   }
        ];
        
        var voteTypeFilters = [
            { isChecked: false, value: "amendment", displayValue: "Amendment"},
            { isChecked: false, value: "cloture", displayValue: "Cloture"},
            { isChecked: false, value: "impeachment", displayValue: "Impeachment"},
            { isChecked: false, value: "leadership", displayValue: "Leadership"},
            { isChecked: false, value: "nomination", displayValue: "Nomination"},
            { isChecked: false, value: "passage", displayValue: "Passage"},
            { isChecked: false, value: "quorum", displayValue: "Quorum"},
            { isChecked: false, value: "recommit", displayValue: "Recommit"},
            { isChecked: false, value: "treaty", displayValue: "Treaty"},
            { isChecked: false, value: "other", displayValue: "Other"}
        ];

        var voteFilterGroups = [
            { name : "Chamber",   urlName : "chambers",    filters : chamberFilters },
            { name : "Vote Type",   urlName : "vote_types", filters : voteTypeFilters }
        ];

        var filterGroups = {
            "/legislators" : legislatorFilterGroups,
            "/votes" : voteFilterGroups
        };

        var uniqueParams = {
            "/legislators" : ["order"],
            "/votes" : []
        };


        /* Service Methods */
        this.getFilterGroups = function(route, routeParams) {
            var results = filterGroups[route];
            updateFilterGroups(results, routeParams);

            return results;
        }

        this.getSelectedFilters = function(filterGroups) {
            var selectedFilters = [];

            for (var index = 0; index < filterGroups.length; index++) {
                var currentFilters = filterGroups[index].filters;

                for (var ind = 0; ind < currentFilters.length; ind++) {
                    var currentFilter = currentFilters[ind];
                    
                    if (currentFilter.isChecked) {
                        selectedFilters.push('"' + currentFilter.displayValue + '"');
                    }
                }
            }

            return selectedFilters.join(", ");
        }

        this.extractRouteParametersUniqueParams = function(filters, routeParams, route) {
        	var newRouteParams = {};
        	var currentFilterGroups = filterGroups[route];

        	for (var index = 0; index < currentFilterGroups.length; index++) {
        		var currentFilterGroup = currentFilterGroups[index];
        		var currentUrlName = currentFilterGroup.urlName;

        		if (routeParams[currentUrlName] != undefined) {
        			newRouteParams[currentUrlName] = routeParams[currentUrlName];
        		}
        	}

        	for (var index = 0; index < filters.length; index++) {
        		var currentFilter = filters[index];

     			newRouteParams[currentFilter.urlName] = currentFilter.value;
        	}

        	return newRouteParams;
        }

        this.extractRouteParameters = function(filterGroups, routeParams, route){
            var routeParameters = {};

            for (var index = 0; index < filterGroups.length; index++) {
                var currentFilterGroup = filterGroups[index];
                var currentFilters = currentFilterGroup.filters;
                var currentSelectedValues = [];

                for (var ind = 0; ind < currentFilters.length; ind++) {
                    var currentFilter = currentFilters[ind];

                    if(currentFilter.isChecked) {
                        currentSelectedValues.push(currentFilter.value);
                    }
                }

                if (currentSelectedValues.length > 0) {
                    routeParameters[currentFilterGroup.urlName] = currentSelectedValues.join(",");
                }
            }

            var uniqueParameters = uniqueParams[route]; 
            for (var index = 0; index < uniqueParameters.length; index++) {
                var currentParam = uniqueParameters[index];
                if (routeParams[currentParam] != undefined) {
                    routeParameters[currentParam] = routeParams[currentParam];
                }
            }

            return routeParameters;
        }
        
        this.showFilterPopup = function(ev, filterGroups) {
            return $mdDialog.show({
                        controller: "FilterDialogController",
                        templateUrl: './client/views/filters/filterDialog.html',
                        controllerAs: "model",
                        parent: angular.element(document.body),
                        locals: {
                            "filterGroups": filterGroups
                        },
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: true
                    });
        }

        /* Helper Methods */

        function updateFilterGroups (filterGroups, routeParams) {
            for (var index = 0; index < filterGroups.length; index++) {
                var currentFilterGroup = filterGroups[index];
                var urlParam = currentFilterGroup.urlName;
                var routeParam = routeParams[urlParam];

                var currentFilters = currentFilterGroup.filters;
                if (routeParam == undefined) {
                    for (var ind = 0; ind < currentFilters.length; ind++) {
                        var currentFilter = currentFilters[ind];
                        currentFilter.isChecked = false;
                    }
                    continue;
                }

                var routeParamValues = routeParam.split(",");
                
                for (var ind = 0; ind < currentFilters.length; ind++) {
                    var currentFilter = currentFilters[ind];
                    if (routeParamValues.includes(currentFilter.value)) {
                        currentFilter.isChecked = true;
                    } else {
                        currentFilter.isChecked = false;
                    }
                }
            }           
        }
	}
})();