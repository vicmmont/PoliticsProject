var http = require("request-promise");

module.exports = function(app) {
	/* ---------- Routes ---------- */
	app.get("/bill", getBillsForCurrentSession);
	app.get("/bill/:id", getBillById);

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
		var requestUrl = "https://congress.api.sunlightfoundation.com/bills?apikey=8686be50f9e64b04952c72f58f409152&fields=bill_id,bill_type,number,chamber,introduced_on,last_action_at,short_title,official_title,summary,summary_short,urls,actions,sponsor,cosponsors&order=last_action_at__desc";

		http(requestUrl)
			.then(function(response) {
				res.send(response);
			})
			.catch(function(error) {
				res.status(400).send(error);
			});
	}
}