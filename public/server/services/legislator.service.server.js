var http = require("request-promise");

module.exports = function(app) {
	var api_key = "8686be50f9e64b04952c72f58f409152";
	var legislators = null;

	/* ---------- Routes ---------- */
	app.get("/legislator", getCurrentLegislators);
	app.get("/legislator/:id", getLegislatorById);
	app.get("/legislator/:id/bill", getLegislatorBills);

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

	function getLegislatorBills(req, res) {
		var legislatorId = req.params.id;
		var sponsorRequestUrl = "https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&sponsor_id=[legislatorId]&fields=bill_id,bill_type,number,last_action_at,short_title,official_title&order=last_action_at__desc";
		var cosponsorRequestUrl = "https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&cosponsor_ids__in=[legislatorId]&fields=bill_id,bill_type,number,last_action_at,short_title,official_title&order=last_action_at__desc";
		sponsorRequestUrl = sponsorRequestUrl.replace("[api_key]", api_key);
		sponsorRequestUrl = sponsorRequestUrl.replace("[legislatorId]", legislatorId);
		cosponsorRequestUrl = cosponsorRequestUrl.replace("[api_key]", api_key);
		cosponsorRequestUrl = cosponsorRequestUrl.replace("[legislatorId]", legislatorId);

		var sponsoredBills = [];
		var cosponsoredBills = [];

		http(sponsorRequestUrl)
			.then(function(response) {
				sponsoredBills = JSON.parse(response).results;
				console.log("Sponsored bills are:");
				for (var index = 0; index < sponsoredBills.length; index++) {
					console.log(sponsoredBills[index].bill_id);
				}
				
				return http(cosponsorRequestUrl);
			}, function(error) {
				res.status(400).send(error);
			})
			.then(function(response) {
				cosponsoredBills = JSON.parse(response).results;

				//To-do: Merge two lists to keep latest ones firsts

				res.send({results: sponsoredBills.concat(cosponsoredBills)});
			}, function(error) {
				res.status(400).send(error);
			});
	}
}