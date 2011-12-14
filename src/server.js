var	mediator = require("mediator"),
	load = require("./utils/load");
	path = require("path");

mediator.on('boot.error', throwError);

load(path.join(__dirname, "routines"), routinesLoaded);

function throwError(err) {
	throw err;
}

function routinesLoaded(err, files) {
	if (err) {
		return mediator.emit('boot.error', err);
	}
	mediator.emit('boot.ready');
}