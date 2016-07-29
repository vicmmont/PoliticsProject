"use strict";

(function(){
	angular
		.module("MyPoliticsApp")
		.controller("FiltersController", filtersController);

	function filtersController(FilterService, $location, $route, $routeParams) {
		var vm = this;
		vm.filterGroups = [];
		vm.routeParams = $location.search();
		function init() {
			vm.filterGroups = FilterService.getFilterGroups($location.path(), $routeParams);
		}

		init();

		vm.filterLegislators = function() {
			var routeParams = FilterService.extractRouteParameters(vm.filterGroups, $routeParams, $location.path());
			$location.search(routeParams);
		}
	}
})();