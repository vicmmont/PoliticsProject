"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("OverviewController", overviewController);

    function overviewController($location) {
    	var vm = this;

    	vm.onLegislatorsClick = function() {
    		$location.url("/legislators");
    	}

    	vm.onVotesClick = function() {
    		$location.url("/votes");
    	}

    	vm.onBillsClick = function() {
    		$location.url("/bills");
    	}

    }
})();