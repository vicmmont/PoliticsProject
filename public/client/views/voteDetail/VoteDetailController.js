"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("VoteDetailController", voteDetailController);

    function voteDetailController(VoteService, $routeParams, $location) {
        var vm = this;
        vm.currentVoteId = $routeParams["voteId"];
        vm.currentVote = null;

        function init() {
            VoteService.getVoteById(vm.currentVoteId)
                .then(function(response) {
                    console.log("response is" + response.data.results);
                    vm.currentVote = response.data.results[0];
                    console.log("current vote is: " + vm.currentVote);
                }, function(error) {
                    console.log(error);
                });   
        }

        init();
    }
})();