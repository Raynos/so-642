var express = require("express"),
	pd = require("pd");

module.exports = pd.bindAll({
	start: start,
	detach: detach,
	createServer: createServer
});

function start(mediator) {
	this.mediator = mediator;
	this.mediator.on("boot.ready", this.createServer);
}

function createServer() {
	this.server = express.createServer();
	this.port = process.env.port || 4000;

	this.mediator.emit("boot.server.created", this.server);

	this.server.listen(this.port);

	this.mediator.emit("boot.server.listening", this.port);
}

function detach() {
	this.server.close();

	this.mediator.emit("detach.server.destroyed", server);

	this.mediator.removeListener("boot.ready", this.createServer);
}