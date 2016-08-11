"use strict";

(function() {
    angular
        .module("MyPoliticsApp")
        .controller("VoteDetailController", voteDetailController);

    function voteDetailController(VoteService, $routeParams, $route, $location, $filter) {
        var vm = this;
        vm.currentVoteId = $routeParams["voteId"];
        vm.currentVote = null;
        vm.voters = [];
        vm.hasError = false;

        vm.totalDataSource =  {
            "chart" : {
                "caption": "Total Votes",
                "yAxisName": "Vote Count",
                "paletteColors": "#7087AA",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "placeValuesInside": "1",
                "valueFontColor": "#ffffff",
                "showAxisLines": "1",
                "axisLineAlpha": "25",
                "divLineAlpha": "10",
                "alignCaptionWithCanvas": "0",
                "showAlternateVGridColor": "0",
                "captionFontSize": "16",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5"                
            },
            "data" : [
                {label : "Yea"},
                {label : "Nay"},
                {label : "Not Voting"},
                {label : "Present"}
            ]
        };

        vm.democratDataSource = {
            "chart" : {
                        "caption": "Democrats",
                        "yAxisName": "Vote Count",
                        "paletteColors": "#033A76",
                        "bgColor": "#ffffff",
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "placeValuesInside": "1",
                        "valueFontColor": "#ffffff",
                        "showAxisLines": "1",
                        "axisLineAlpha": "25",
                        "divLineAlpha": "10",
                        "alignCaptionWithCanvas": "0",
                        "showAlternateVGridColor": "0",
                        "captionFontSize": "16",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0",
                        "toolTipColor": "#ffffff",
                        "toolTipBorderThickness": "0",
                        "toolTipBgColor": "#000000",
                        "toolTipBgAlpha": "80",
                        "toolTipBorderRadius": "2",
                        "toolTipPadding": "5"
            },
            "data" : [
                {label : "Yea"},
                {label : "Nay"},
                {label : "Not Voting"},
                {label : "Present"}
            ]
        };

        vm.republicanDataSource = {
            "chart": {
                "caption": "Republicans",
                "yAxisName": "Vote Count",
                "paletteColors": "#861316",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "placeValuesInside": "1",
                "valueFontColor": "#ffffff",
                "showAxisLines": "1",
                "axisLineAlpha": "25",
                "divLineAlpha": "10",
                "alignCaptionWithCanvas": "0",
                "showAlternateVGridColor": "0",
                "captionFontSize": "16",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5"
            },
            "data" : [
                {label : "Yea"},
                {label : "Nay"},
                {label : "Not Voting"},
                {label : "Present"}
            ]
        };

        function init() {
            VoteService.getVoteById(vm.currentVoteId)
                .then(function(response) {
                    if (response.data.results.length === 0) {
                        vm.hasError = true;
                        return;
                    }

                    vm.currentVote = response.data.results[0];
                    getVoters();
                    setDataSources();
                }, function(error) {
                    vm.hasError = true;
                });   
        }

        init();

        vm.onLegislatorClick = function(legislatorId) {
            $location.url("/legislator/" + legislatorId);
        }

        vm.refreshPage = function() {
            $route.reload();
        }

        /* Helper Methods */

        function setDataSources() {
            vm.totalDataSource.data = populateData(vm.totalDataSource.data, vm.currentVote.breakdown.total);
            vm.democratDataSource.data = populateData(vm.democratDataSource.data, vm.currentVote.breakdown.party.D);
            vm.republicanDataSource.data = populateData(vm.republicanDataSource.data, vm.currentVote.breakdown.party.R);
        }

        function populateData(chartData, breakdownData) {
            for (var index = 0; index < chartData.length; index++) {
                var currentChartDataObject = chartData[index];
                
                var currentLabel = currentChartDataObject.label;
                
                currentChartDataObject.value = breakdownData[currentLabel];
                chartData[index] = currentChartDataObject;
            }

            return chartData;
        }

        function getVoters() {
            var results = [];
            var voters = vm.currentVote.voters;
            for (var property in voters) {
                if (voters.hasOwnProperty(property)) {
                    var voter = voters[property].voter;
                    voter.vote = voters[property].vote;
                    results.push(voter);
                }
            }

            vm.voters = $filter('orderBy')(results, ["state_name", "last_name"]);
        }
    }
})();