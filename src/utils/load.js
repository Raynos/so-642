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
				objs.push(require(uri));
				next();
			} else {
				load(uri, appendResultsToObjs);
			}
		}

		function appendResultsToObjs(err, results) {
			if (err) {
				return callback(err);
			}
			objs.push.apply(objs, results);
			next();
		}
	}
}