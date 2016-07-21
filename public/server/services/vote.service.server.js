var http = require("request-promise");

module.exports = function(app) {
	/* ---------- Routes ---------- */
	app.get("/vote", getVotesForCurrentSession);
	app.get("/vote/:id", getVoteById);

	function getVoteById(req, res) {
		var id = req.params.id;
		var requestUrl = "https://congress.api.sunlightfoundation.com/votes?apikey=8686be50f9e64b04952c72f58f409152&fields=roll_id,chamber,voted_at,vote_type,question,required,result,bill_id,bill,voters,breakdown&roll_id=[vote_id]&voted_at__gte=2015-01-01T00:00:00Z&order=voted_at__desc";
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
		var pageSize = req.query.pageSize;
		var pageNumber = req.query.pageNumber;
		var requestUrl = "https://congress.api.sunlightfoundation.com/votes?apikey=8686be50f9e64b04952c72f58f409152&fields=roll_id,voted_at,question,bill&voted_at__gte=2015-01-01T00:00:00Z&order=voted_at__desc";
		requestUrl = requestUrl.concat("&per_page=" + pageSize);
		requestUrl = requestUrl.concat("&page=" + pageNumber);

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