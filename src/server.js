var EventEmitter = require("events").EventEmitter,
	mediator = new EventEmitter(),
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
	Object.keys(files).forEach(startWithMediator);
	mediator.emit('boot.ready');

	function startWithMediator(name) {
		files[name].start(mediator);
	}
}