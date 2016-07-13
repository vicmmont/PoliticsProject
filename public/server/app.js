module.exports = function(app) {
    require("./services/legislator.service.server.js")(app);
    require("./services/bill.service.server.js")(app);
    require("./services/vote.service.server.js")(app);
}