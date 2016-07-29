var http = require("request-promise");

module.exports = function(app) {
	/* ---------- Routes ---------- */
	app.get("/vote", getVotesForCurrentSession);
	app.get("/vote/:id", getVoteById);
	app.get("/legislator/:id/vote", getVotesByLegislatorId);

	function getVoteById(req, res) {
		var id = req.params.id;
		var requestUrl = "https://congress.api.sunlightfoundation.com/votes?apikey=8686be50f9e64b04952c72f58f409152&fields=roll_id,chamber,voted_at,vote_type,question,required,result,bill_id,bill,nomination_id,nomination,voters,breakdown&roll_id=[vote_id]&voted_at__gte=2015-01-01T00:00:00Z&order=voted_at__desc";
		requestUrl = requestUrl.replace("[vote_id]", id);

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}

	function getVotesForCurrentSession(req, res) {
		var optionalQueryParameters = ["chambers", "vote_types"];
		var correspondingOptionalQueryParameters = ["chamber__in=", "vote_type__in="];
		var requiredQueryParameters = ["pageSize", "pageNumber"];
		var correspondingRequiredQueryParameters = ["per_page=", "page="];
		var requestUrl = "https://congress.api.sunlightfoundation.com/votes?apikey=8686be50f9e64b04952c72f58f409152&fields=roll_id,voted_at,question,bill,nomination&voted_at__gte=2015-01-01T00:00:00Z&order=voted_at__desc";

		for (var index = 0; index < optionalQueryParameters.length; index++) {
			var queryParamValues = req.query[optionalQueryParameters[index]];

			if (queryParamValues != undefined) {
				requestUrl += "&".concat(correspondingOptionalQueryParameters[index] + queryParamValues.split(",").join("|"));
			}
		}

		for (var index = 0; index < requiredQueryParameters.length; index++) {
			var queryParamValues = req.query[requiredQueryParameters[index]];

			if (queryParamValues != undefined) {
				requestUrl += "&".concat(correspondingRequiredQueryParameters[index] + queryParamValues.split(",").join("|"));
				continue;
			}
			res.status(400).send(error);
			return;
		}

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}

	function getVotesByLegislatorId(req, res) {
		var legislatorId = req.params.id;
		var pageSize = req.query.pageSize;
		var pageNumber = req.query.pageNumber;
		var requestUrl = "https://congress.api.sunlightfoundation.com/votes?apikey=8686be50f9e64b04952c72f58f409152&fields=roll_id,voted_at,question,bill,nomination&voted_at__gte=2015-01-01T00:00:00Z&voter_ids.[legislatorId]__exists=true&order=voted_at__desc&per_page=[pageSize]&page=[pageNumber]";
		requestUrl = requestUrl.replace("[legislatorId]", legislatorId);
		requestUrl = requestUrl.replace("[pageSize]", pageSize);
		requestUrl = requestUrl.replace("[pageNumber]", pageNumber);

		console.log(requestUrl);
		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}
}