'use strict';
import request from 'request';
import HttpsProxyAgent  from 'https-proxy-agent';

class FlowdockController {

  // Make it load as backgroup service emit socket action to load
  static postMessage(data) {
    ////////////////
    //  Post request to Flowdock
    ///////////////
    // Set the headers
    let headers = {
        'Content-Type':     'application/json'
    };

    let proxy = 'http://proxy.nas.medcity.net:80';  
    let agent = new HttpsProxyAgent(proxy);

    // Configure the request
    let options = {
        uri: 'https://api.flowdock.com/messages',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          flow_token: data.flowdock,
          app: "chat",
          event: "message",
          content: ":red_circle: **Environment:** *" + data.env + "*  **Status:** *"+ data.healthStatus+"*  **Timestamp:** *" + new Date().toLocaleString() + "* ``Please login to the system and verify``"
        }),
        agent: agent
    };

    // Start the request
    request.post(options, function (error, response, body) {
        if (!error) {
            // Print out the response body
            console.log(body);
        }
        if(error) {
          console.err("flowdock: " + error);
        }
    });
  }
}

export default FlowdockController;