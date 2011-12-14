var request = require('request');

var uri = "http://localhost:81";

module.exports = {
	"test /": function (test) {
		test.expect(2);

		request(uri, handleResponse);

		function handleResponse(err, res, body) {
			if (err) throw err;

			test.equal(res.statusCode, 200, 
				"statusCode is not 200");

			test.equal(body, "Hello World\n",
				"body is not hello world");
			test.done();	
		}
	}
};