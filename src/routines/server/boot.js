var mediator = require("mediator"),
	express = require("express");

mediator.on("boot.ready", createServer);

function createServer() {
	var server = express.createServer(),
		port = process.env.port || 4000;

	mediator.emit("boot.server.created", server);

	server.listen(port);

	mediator.emit("boot.server.listening", port);
}