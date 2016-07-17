var http = require("request-promise");

module.exports = function(app) {
	/* ---------- Routes ---------- */
	app.get("/bill", getBillsForCurrentSession);
	app.get("/bill/:id", getBillById);
	app.get("/legislator/:id/bill", getSponsoredBillsForLegislator);

	function getBillById(req, res) {
		var id = req.params.id;
		var requestUrl = "https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&bill_id=[bill_id]&fields=bill_id,bill_type,number,chamber,introduced_on,last_action_at,short_title,official_title,summary,summary_short,urls,actions,sponsor,cosponsors";
		requestUrl = requestUrl.replace("[bill_id]", id);

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}

	function getBillsForCurrentSession(req, res) {
		var requestUrl = "https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&fields=bill_id,bill_type,number,last_action_at,short_title,official_title&order=last_action_at__desc&per_page=48&page=1";

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}

	function getSponsoredBillsForLegislator(req, res) {
		var requestUrl = 'https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&fields=bill_id,bill_type,number,chamber,congress,last_action_at,short_title,official_title&order=last_action_at__desc&last_action_at__gte="2015-01-03T00:00:00Z"&[billType]=[legislatorId]&per_page=[pageSize]&page=[pageNumber]';
		var legislatorId = req.params.id;
		var billType = req.query.billType;
		
		if (billType === 'cosponsoredBills') {
			billType = "cosponsor_ids__in";
		} else if (billType === 'sponsoredBills') {
			billType = "sponsor_id";
		} else {
			res.status(400).send("Invalid billType");
			return;
		}

		var pageSize = req.query.pageSize;
		var pageNumber = req.query.pageNumber;

		requestUrl = requestUrl.replace("[billType]", billType);
		requestUrl = requestUrl.replace("[legislatorId]", legislatorId);
		requestUrl = requestUrl.replace("[pageSize]", pageSize);
		requestUrl = requestUrl.replace("[pageNumber]", pageNumber);

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}
}