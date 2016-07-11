var http = require("request-promise");

module.exports = function(app) {
	var api_key = "";
	var legislators = null;

	/* ---------- Routes ---------- */
	app.get("/legislator", getCurrentLegislators);
	app.get("/legislator/:id", getLegislatorById);

	function getCurrentLegislators(req, res) {
		var requestUrl = "https://congress.api.sunlightfoundation.com/legislators?apikey=[api_key]&fields=bioguide_id,first_name,last_name,party,chamber,gender,state_name,district,title&order=last_name__asc&per_page=all";
		requestUrl = requestUrl.replace("[api_key]", api_key);

		if (legislators != null) {
			res.send({results: legislators});
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

	function getLegislatorById(req, res) {
		var id = req.params.id;
		var requestUrl = "https://congress.api.sunlightfoundation.com/legislators?apikey=[api_key]&fields=bioguide_id,first_name,middle_name,last_name,name_suffix,party,state_name,district,state_rank,title,birthday,term_start,term_end,phone,fax,office,website,contact_form,twitter_id,facebook_id";
		requestUrl = requestUrl.replace("[api_key]", api_key);
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
