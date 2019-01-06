'use strict';
import { Client } from 'node-rest-client';
import fetch from 'node-fetch';
import request from 'request';
import HttpsProxyAgent  from 'https-proxy-agent';
import mail from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

class LoadDataController {

  // Make it load as backgroup service emit socket action to load
  static getAllData(socket) {

    // REST call to server for production status
    let args = {
      headers: { "Content-Type": "application/json" }
    };
    let options = {
      mimetypes: {
        json: ["application/json"]

      },
      renderOpts: {
        pretty: true
      }
    };
    let client = new Client(options);
    client.get("http://localhost:8080/test-automation-monitor/rest/get", args, function (data, response) {
      socket.emit('returnloadMonitor', data);
    })
    // handling specific request errors 
    .on('error', function (err) {
        console.log('something went wrong on req1!!', err);
        socket.emit('returnloadMonitorErr', err);
    });
      // Handling client errors
    client.on('error', function (err) {
        console.log('something went wrong on req1!!', err);
        socket.emit('returnloadMonitorErr', err);
    });
  }

  static monitorData() {
    // REST call to server for production status
    let args = {
      headers: { "Content-Type": "application/json" }
    };
    let options = {
      mimetypes: {
        json: ["application/json"]

      },
      renderOpts: {
        pretty: true
      }
    };
    let client = new Client(options);
    let result = "";
    let done = false;
    client.get("http://localhost:8080/test-automation-monitor/rest/get", args, function (data, response) {
      result = data;
      done = true;
    })
    // handling specific request errors 
    .on('error', function (err) {
        console.log('something went wrong on req1!!', err);
    });
      // Handling client errors
    client.on('error', function (err) {
        console.log('something went wrong on req1!!', err);
    });
      //We waiting for data.
    require('deasync').loopWhile(function(){return !done;});
      return result;
  }
}

export default LoadDataController;