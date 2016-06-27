"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("VotesController", votesController);

    function votesController($scope, VoteService) {
        $scope.message = "No message";

        function init() {
        }

        init();
    }
})();