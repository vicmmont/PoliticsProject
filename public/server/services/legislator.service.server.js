var http = require("request-promise");

module.exports = function(app) {
	var requestUrl = "https://congress.api.sunlightfoundation.com/legislators?apikey=[api_key]&fields=bioguide_id,first_name,nickname,middle_name,last_name,name_suffix,party,gender,state_name,district,state_rank,title,birthday,term_start,term_end,phone,fax,office,website,contact_form,twitter_id&order=last_name__asc&page=1&per_page=50";
	var api_key = "";
	var legislators = null;
	var currentReq = null;
	var currentRes = null;

	/* getLegislators global variables*/
	var legislatorsTotal = 0;
	var legislatorsCount = 0;
	var page = 2;

	/* ---------- Routes ---------- */
	app.get("/legislator", getLegislators);

	function getLegislators(req, res) {
		if (legislators != null) {
			res.send({results: legislators});
			return;
		}
		
		currentReq = req;
		currentRes = res;
		requestUrl = requestUrl.replace("[api_key]", api_key);

		http(requestUrl)
			.then(getLegislatorsProcess)
			.catch(handleError);
	}

	function getLegislatorsProcess(response) {
		var JsonData = JSON.parse(response);
		
		if (legislators === null) {
			legislators = JsonData.results;
		} else {
			legislators = legislators.concat(JsonData.results);
		}

		if (legislatorsTotal === 0) {
			legislatorsTotal = JsonData.count;
		}

		legislatorsCount += JsonData.page.count;

		if (legislatorsCount < legislatorsTotal) {
			requestUrl = requestUrl.replace("page=" + (page - 1), "page=" + page);
			page++;

			http(requestUrl)
				.then(getLegislatorsProcess)
				.catch(handleError);
		} else {
			currentRes.send({results: legislators});
			return;
		}
	}

	function handleError(error) {
		currentRes.status(400).send(error);
	}
		
}