var mediator = require("mediator");

require("../../routines/controllers/home.js")

module.exports = {
	"test controller home main": function (test) {
		test.expect(1);

		mediator.emit("controller.home.main", null, {
			end: function (data) {
				test.ok(data,
					"end was not called with data");
				test.done();
			}
		});
	}
};