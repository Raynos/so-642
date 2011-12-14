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

		function handleResponse(res) {
			var body = "";
			test.equal(res.statusCode, 200, 
				"statusCode is not 200");

			res.on("data", appendDataToBody);

			res.on("end", testBody);

			function appendDataToBody(chunk) {
				body += chunk;
			}

			function testBody() {
				test.equal(body, "Hello World\n",
					"body is not hello world");
				test.done();	
			} 
		}
	}
};

function throwError(err) {
	throw err;
}