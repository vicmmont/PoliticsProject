"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("VotesController", votesController);

    function votesController(VoteService, $location, $routeParams) {
    	var vm = this;
    	vm.votes = [];
    	vm.pageSize = 48;
        vm.totalVoteCount = 0;

        function init() {
        	var pageNumber = 1;
        	VoteService.getVotesForCurrentSession($routeParams, vm.pageSize, pageNumber)
        		.then(function(response) {
        			vm.votes = response.data.results;
        			vm.totalVoteCount = response.data.count;
        		}, function(error) {
        			console.log(error);
        		});
        }

        init();

        vm.onVoteClick = function(rollId) {
        	$location.url("/vote/" + rollId);
        }

        vm.getMoreVotes = function(dataCount) {
            var pageNumber = 0;

            if (dataCount != vm.pageSize) {
                pageNumber = vm.votes.length / dataCount; 
                
                if (dataCount > vm.pageSize && pageNumber % 1 != 0) {
                    pageNumber = vm.votes.length / vm.pageSize;
                } else {
                    vm.pageSize = dataCount; 
                }
            } else {
                pageNumber = vm.votes.length / vm.pageSize;
            }

            pageNumber += 1;
            VoteService.getVotesForCurrentSession($routeParams, vm.pageSize, pageNumber)
                .then(function(response) {
                    vm.votes = vm.votes.concat(response.data.results);
                }, function(error) {
                    console.log("error!");
            });
        }
    }
})();