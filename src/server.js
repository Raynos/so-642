var	mediator = require("mediator"),
	path = require("path");

mediator.on('boot.error', throwError);

load(path.join(__dirname, "routines"), routinesLoaded);

function throwError(err) {
	throw err;
}

function routinesLoaded(err) {
	if (err) {
		return mediator.emit('boot.error', err);
	}

	mediator.emit('boot.ready');
}

function load(directory, callback) {

}