var fs = require("fs"),
	path = require("path"),
	pd = require("pd"),
	after = require("after");

module.exports = pd.bindAll({
	load: load,
	findFileNames: findFileNames
});

function findFileNames(directory, callback) {
	var that = this;
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
				objs[uri] = uri;
				next();
			} else {
				that.load(uri, appendResultsToObjs);
			}
		}

		function appendResultsToObjs(err, results) {
			if (err) {
				return callback(err);
			}
			pd.extend(objs, results);
			next();
		}
	}
}

function load(directory, callback) {
	this.findFileNames(directory, mapToObjects);

	function mapToObjects(err, files) {
		if (err) {
			return callback(err);
		}
		Object.keys(files).forEach(convertToModule);
		callback(null, files);

		function convertToModule(name) {
			files[name] = require(name);
		}
	}
}