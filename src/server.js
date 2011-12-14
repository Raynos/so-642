var	mediator = require("mediator"),
	load = require("./utils/load");
	path = require("path");

mediator.on('boot.error', throwError);

load(path.join(__dirname, "routines"), routinesLoaded);

function throwError(err) {
	throw err;
}

function routinesLoaded(files) {
	mediator.emit('boot.ready');
}