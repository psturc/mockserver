const mockServerClient = require('mockserver-client').mockServerClient;
const mockserver = require('mockserver-node');

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 1080
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"

mockserver.start_mockserver({
                serverPort: server_port,
                proxyPort: 1090,
                verbose: true
}).then(function() {
  mockServerClient(server_ip_address, server_port).mockAnyResponse({
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
