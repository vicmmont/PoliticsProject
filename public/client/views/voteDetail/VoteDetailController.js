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

        vm.myDataSource = {
                            "chart": {
                                "caption": "Total Votes",
                                "yAxisName": "Vote Count",
                                "paletteColors": "#06C81B",
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
                            "data": [
                                {
                                    "label": "Yea",
                                    "value": "169"
                                },
                                {
                                    "label": "Nay",
                                    "value": "236"
                                },
                                {
                                    "label": "Not Voting",
                                    "value": "28"
                                },
                                {
                                    "label": "Present",
                                    "value": "0"
                                }
                            ]
                        };

        vm.myDataSource2 = {
                            "chart": {
                                "caption": "Democrats",
                                "yAxisName": "Vote Count",
                                "paletteColors": "#0075c2",
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
                            "data": [
                                {
                                    "label": "Yea",
                                    "value": "17"
                                },
                                {
                                    "label": "Nay",
                                    "value": "169"
                                },
                                {
                                    "label": "Not Voting",
                                    "value": "1"
                                },
                                {
                                    "label": "Present",
                                    "value": "0"
                                }
                            ]
                        };

        vm.myDataSource3 = {
                            "chart": {
                                "caption": "Republicans",
                                "yAxisName": "Vote Count",
                                "paletteColors": "#E12E0E",
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
                            "data": [
                                {
                                    "label": "Yea",
                                    "value": "11"
                                },
                                {
                                    "label": "Nay",
                                    "value": "235"
                                },
                                {
                                    "label": "Not Voting",
                                    "value": "0"
                                },
                                {
                                    "label": "Present",
                                    "value": "0"
                                }
                            ]
                        };
    //
    }
})();