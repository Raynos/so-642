var	mediator = require("mediator"),
	fs = require("fs"),
	after = require("after"),
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
	fs.readdir(directory, handleFiles);

	function handleFiles(err, files) {
		if (err) return mediator.emit('boot.error', err);
		
		var next = after(files.length, callback);
		files.forEach(handleFile);

		function handleFile(file) {
			var uri = path.join(directory, file);
			if (file.substr(-3, 3) === ".js") {
				require(uri);
				next();
			} else {
				load(uri, callback);
			}
		}
	}
}