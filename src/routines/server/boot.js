var express = require("express"),
	pd = require("pd");

module.exports = pd.bindAll({
	start: start,
	createServer: createServer
});

function start(mediator) {
	this.mediator = mediator;
	this.mediator.on("boot.ready", this.createServer);
}

function createServer() {
	var server = express.createServer(),
		port = process.env.port || 4000;

	this.mediator.emit("boot.server.created", server);

	server.listen(port);

	this.mediator.emit("boot.server.listening", port);
}