console.log(__dirname);

var fs = require("fs"),
	findFileNames = require("../../utils/load").findFileNames,
	Module = require("module"),
	path = require("path"),
	pd = require("pd");

var routinesPath = path.join(__dirname, "..");

module.exports = pd.bindAll({
	start: start,
	attachFileListener: attachFileListener,
	attachHotCodeReload: attachHotCodeReload
});

function start(mediator) {
	this.mediator = mediator;
	this.mediator.on("boot.ready", this.attachHotCodeReload);
}

function attachHotCodeReload() {
	var that = this;
	findFileNames(routinesPath, handleFiles);

	function handleFiles(err, files) {
		if (err) {
			return that.mediator.emit("boot.error", err);
		}

		Object.keys(files).forEach(that.attachFileListener);
	}
}

function attachFileListener(name) {
	var that = this;
	fs.watch(name, handleFileChange);
	
	function handleFileChange(event) {
		console.log(event);
		asyncrequire(name, attachModule);
	}

	function attachModule(err, module) {
		if (err) {
			return that.mediator.emit("boot.error", err);
		}
		that.mediator.attach(name, module);
	}
}

function asyncrequire(name, callback) {
	fs.readFile(name, handleFileRead);

	function handleFileRead(err, file) {
		if (err) {
			return callback(err);
		}
		var m = new Module();
		m._compile(file.toString(), name);
		cb(null, m.exports);
	}
}