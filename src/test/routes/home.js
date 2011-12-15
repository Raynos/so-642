var mediator = require("mediator");

require("../../routines/routes/home.js");

module.exports = {
	"test controller home main": function (test) {
		var req = {}, res = {};

		test.expect(2);

		mediator.once("controller.home.main", testHome)

		mediator.emit("boot.server.created",{
			get: function (_, cb) {
				cb(req, res);
			}
		});

		function testHome(request, response) {
			test.equal(request, req,
				"request objects are not the same");
			test.equal(response, res, 
				"response objects are not the same");
			test.done();
		}
	}
}