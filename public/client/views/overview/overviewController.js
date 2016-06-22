"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("OverviewController", overviewController);

    function overviewController($scope, VoteService) {
        $scope.message = "No message";

        function init() {
            VoteService.getAllVotesForYear(2016)
            .then(function(response) {
                $scope.message = response.data.results;
            });
        }

        init();
    }
})();