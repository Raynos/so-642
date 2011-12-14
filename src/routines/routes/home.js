var mediator = require("mediator");

mediator.on("boot.server.created", attachRoutes);

function attachRoutes(server) {
	server.get("/", handleMain);

	function handleMain(req, res) {
		mediator.emit("controller.home.main", req, res);
	}
}