"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("LegislatorsController", legislatorsController);

    function legislatorsController($scope, LegislatorService) {
        $scope.message = "No message";

        function init() {
        }

        init();
    }
})();