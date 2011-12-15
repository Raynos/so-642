var pd = require("pd");

module.exports = pd.bindAll({
	start: start,
	attachRoutes: attachRoutes
});

function start(mediator) {
	this.mediator = mediator;
	this.mediator.on("boot.server.created", this.attachRoutes);	
}

function attachRoutes(server) {
	var that = this;

	server.get("/", handleMain);

	function handleMain(req, res) {
		that.mediator.emit("controller.home.main", req, res);
	}
}