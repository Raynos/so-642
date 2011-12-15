var fs = require("fs"),
	path = require("path"),
	after = require("after");

module.exports = load;

function load(directory, callback) {
	var objs = [];
	fs.readdir(directory, handleFiles);

	function handleFiles(err, files) {
		if (err) return callback(err);
		
		var next = after(files.length, 
			callback.bind(null, null, objs));
		files.forEach(handleFile);

		function handleFile(file) {
			var uri = path.join(directory, file);
			if (file.substr(-3, 3) === ".js") {
				objs[uri] = require(uri);
				next();
			} else {
				load(uri, appendResultsToObjs);
			}
		}

		function appendResultsToObjs(err, results) {
			if (err) {
				return callback(err);
			}
			var keys = Object.keys(results);
			for (var i = 0, len = keys.length; i < len; i++) {
				var key = keys[i];
				objs[key] = results[key];
			}
			next();
		}
	}
}