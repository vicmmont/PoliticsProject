"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorDetailController", legislatorDetailController);

    function legislatorDetailController(LegislatorService, $routeParams, $location) {
        var vm = this;
        vm.currentLegislatorId = $routeParams["legislatorId"];
        vm.currentLegislator = null;

        function init() {
            LegislatorService.getLegislatorById(vm.currentLegislatorId)
            .then(function(response){
                vm.currentLegislator = response.data.results[0];
                console.log("response is" + response.data.results[0]);
            }, function(error){
                console.log("Error retrieving single legislator");
            });
        }

        init();

    }
})();