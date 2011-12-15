module.exports = {
	start: start,
	detach: detach
};

function start(mediator) {
	mediator.on("controller.home.main", handleMain);	
}

function handleMain(req, res) {
	res.end("Hello World\n");
}

function detach(mediator) {
	mediator.removeHandler("controller.home.main", handleMain);
}