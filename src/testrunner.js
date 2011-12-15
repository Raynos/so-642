var load = require("./utils/load"),
	nodeunit = require("nodeunit");
	path = require("path");

load(path.join(__dirname, "test"), runTests);

function runTests(err, files) {
	if (err) {
		throw err;
	}

	var obj = {};

	for (var i = 0, len = files.length; i < len; i++) {
		obj[i] = files[i];
	}

	nodeunit.reporters.default.run(obj);
}