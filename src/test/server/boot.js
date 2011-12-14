var mediator = require("mediator");
	
require("../../routines/server/boot");

module.exports = {
	"test server creation": function (test) {
		var server;

		test.expect(1);

		mediator.once("boot.server.created", testServer);
		mediator.once("boot.server.listening", cleanUp);

		mediator.emit("boot.ready");

		function testServer(value) {
			server = value;
			test.ok(server, "server not created");
		}

		function cleanUp() {
			server.close();

			test.done();
		}
	},
	"test server listening": function (test) {
		var server;

		test.expect(1);

		mediator.once("boot.server.created", storeServer);
		mediator.once("boot.server.listening", testPort);

		mediator.emit("boot.ready");

		function testPort(port) {
			test.equal(port, 4000,
				"port not as expected");

			server.close();

			test.done();
		}

		function storeServer(value) {
			server = value;
		}
	}
};