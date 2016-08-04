"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("VotesController", votesController);

    function votesController(VoteService, FilterService, $location, $routeParams, $route) {
    	var vm = this;
    	vm.votes = [];
    	vm.pageSize = 48;
        vm.totalVoteCount = 0;
        vm.hasError = false;
        vm.hasNoResults = false;

        function init() {
        	var pageNumber = 1;
        	VoteService.getVotesForCurrentSession($routeParams, vm.pageSize, pageNumber)
        		.then(function(response) {
                    if (response.data.count === 0) {
                        vm.hasNoResults = true;
                    }

        			vm.votes = response.data.results;
        			vm.totalVoteCount = response.data.count;
        		}, function(error) {
        			vm.hasError = true;
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

        vm.refreshPage = function() {
            $route.reload();
        }

        /* Dialog Popup */
        vm.showFilterPopup = function(ev) {
            var filterGroups = FilterService.getFilterGroups($location.path(), $routeParams);

            FilterService.showFilterPopup(ev, filterGroups)
                .then(function(newFilterGroups) {
                    filterGroups = newFilterGroups;
                    var routeParams = FilterService.extractRouteParameters(filterGroups, $routeParams, $location.path());
                    $location.search(routeParams);
                }, function() {
                    console.log("You canceled the dialog");;
                });
        }
    }
})();