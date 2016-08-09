"use strict";

(function() {
    angular
    .module('MyPoliticsApp')
    .controller('FilterDialogController', filterDialogController);

    function filterDialogController($mdDialog, filterGroups) {
        var vm = this;
        vm.filterGroups = filterGroups;

        function init() {
            for (var index = 0; index < vm.filterGroups.length; index++) {
                var currentFilterGroup = filterGroups[index];
                if (currentFilterGroup.id != undefined) {
                    break;
                } else {
                    currentFilterGroup.id = index;
                }

                if (currentFilterGroup.checkedCount != undefined) {
                    break;
                } else {
                    var currentFilters = currentFilterGroup.filters;
                    var checkedFilterCount = 0;
                    for (var ind = 0; ind < currentFilters.length; ind++) {
                        if (currentFilters[ind].isChecked) {
                            checkedFilterCount += 1;
                        }
                    }
                    currentFilterGroup.selectedFilterCount = checkedFilterCount;
                }
            }   
        }  

        init();

        vm.onSelectFilter = function(filterGroup, filter) {
            filter.isChecked = !filter.isChecked;

            if (filter.isChecked) {
                filterGroup.selectedFilterCount += 1;
            } else {
                filterGroup.selectedFilterCount -= 1;
            }
        }

        vm.cancel = function() {
            $mdDialog.cancel();
        }

        vm.filter = function() {
            $mdDialog.hide(vm.filterGroups);
        }
    }
})();