var EventEmitter = require("events").EventEmitter.prototype,
	pd = require("pd");

var Core = pd.bindAll({
	attach: attach,
	modules: {}
});

pd.extend(Core, EventEmitter);

module.exports = Core;

function attach(name, module) {
	if (typeof name !== "string") {
		return Object.keys(name).forEach(invokeAttach, this);
	}

	this.modules[name] = module;

	module.start(this);

	function invokeAttach(key) {
		this.attach(key, name[key]);
	}
}