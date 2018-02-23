var mockServerClient = require('mockserver-client').mockServerClient;
var mockserver = require('mockserver-node');

mockserver.start_mockserver({
                serverPort: 1080,
                proxyPort: 1090,
                verbose: true
}).then(function() {
  mockServerClient("localhost", 1080).mockAnyResponse({
    "httpRequest": {
        "path": "/metrics"
    },
    "httpResponse": {
        "body": "some_response_body"
    }
  }).then(
    function () {
        console.log("expectation created");
    },
    function (error) {
        console.log(error);
    }
  );
})
