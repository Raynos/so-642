var mediator = require("mediator");

mediator.on("controller.home.main", handleMain);

function handleMain(req, res) {
	res.end("hello world!\n");
}