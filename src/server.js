var	load = require("./utils/load").load,
	core = require("./utils/core"),
	path = require("path");

core.on('boot.error', throwError);

load(path.join(__dirname, "routines"), routinesLoaded);

function throwError(err) {
	throw err;
}

function routinesLoaded(err, files) {
	if (err) {
		return core.emit('boot.error', err);
	}

	core.attach(files);
	core.emit('boot.ready');
}