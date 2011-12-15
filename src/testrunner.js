var load = require("./utils/load"),
	nodeunit = require("nodeunit");
	path = require("path");

load(path.join(__dirname, "test"), runTests);

function runTests(err, files) {
	if (err) {
		throw err;
	}

	nodeunit.reporters.default.run(files);
}