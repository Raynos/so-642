var pd = require("pd");

module.exports = pd.bindAll({
	start: start,
	handleMain: handleMain,
	cleanUpServer: cleanUpServer,
	detach: detach,
	attachRoutes: attachRoutes
});

function start(mediator) {
	this.mediator = mediator;
	this.mediator.on("boot.server.created", this.attachRoutes);
	this.mediator.on("detach.server.destroyed", 
		this.cleanUpServer);
}

function attachRoutes(server) {
	this.server = server;

	this.server.get("/", this.handleMain);
}

function handleMain(req, res) {
	this.mediator.emit("controller.home.main", req, res);
}

function detach() {
	this.mediator.removeHandler(
		"boot.server.created", this.attachRoutes);

	this.cleanUpServer();
}

function cleanUpServer() {
	this.server.routes.remove(this.server.get("/")[0]);

	delete this.server;
}