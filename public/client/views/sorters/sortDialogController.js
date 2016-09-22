"use strict";

(function() {
	angular
		.module("MyPoliticsApp")
		.controller('SortDialogController', sortDialogController)

	function sortDialogController($mdDialog, sortCriteria) {
		var vm = this;
		vm.sortCriteria = sortCriteria;

		vm.onSortCriterionClick = function(sortCriterion) {
			for (var index = 0; index < vm.sortCriteria.length; index++) {
				var currentSorter = vm.sortCriteria[index];

				if (currentSorter.value === sortCriterion.value) {
					currentSorter.isChecked = true;
				} else {
					currentSorter.isChecked = false;
				}
			}
        }

        vm.cancel = function() {
            $mdDialog.cancel();
        }

        vm.sort = function() {
        	var selectedSortCriterion = null;

        	for (var index = 0; index < vm.sortCriteria.length; index++) {
        		var selectedSorter = vm.sortCriteria[index];
        		
        		if (selectedSorter.isChecked) {
        			selectedSortCriterion = selectedSorter;
        			break;
        		}
        	}

            $mdDialog.hide(selectedSortCriterion);
        }

	}
})();