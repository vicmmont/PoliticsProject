var http = require("request-promise");

module.exports = function(app) {
	/* ---------- Routes ---------- */
	app.get("/legislator", getCurrentLegislators);
	app.get("/legislator/:id", getLegislatorById);

	function getCurrentLegislators(req, res) {
		var possibleQueryParams = ["parties", "chambers", "states", "order"];
		var correspondingKeys = ["party__in=", "chamber__in=", "state_name__in=", "order="];

		var requestUrl = "https://congress.api.sunlightfoundation.com/legislators?apikey=8686be50f9e64b04952c72f58f409152&fields=bioguide_id,first_name,last_name,party,chamber,gender,state_name,district,title&order=last_name__asc&per_page=all";

		for (var index = 0; index < possibleQueryParams.length; index++) {
			var queryParamValues = req.query[possibleQueryParams[index]];

			if (queryParamValues != undefined) {
				requestUrl += "&".concat(correspondingKeys[index] + queryParamValues.split(",").join("|"));
			}
		}

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}

	function getLegislatorById(req, res) {
		var id = req.params.id;
		var requestUrl = "https://congress.api.sunlightfoundation.com/legislators?apikey=8686be50f9e64b04952c72f58f409152&fields=bioguide_id,first_name,middle_name,last_name,name_suffix,party,state_name,district,state_rank,title,birthday,term_start,term_end,phone,fax,office,website,contact_form,twitter_id,facebook_id";
		requestUrl = requestUrl + "&bioguide_id=" + id;
		
		http(requestUrl)
			.then(function(response){
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}
}