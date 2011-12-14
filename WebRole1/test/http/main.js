var http = require("http");

module.exports = {
	"test /": function (test) {
		test.expect(2);

		var req = http.request({
			host: "localhost",
			port: 81,
			path: "/"
		}, handleResponse);
		
		req.on("error", throwError);

		req.end();

		function handleResponse() {
			
		}
	}
};

function throwError(err) {
	throw err;
}