import express from 'express';
import path from 'path';
import http from 'http';
import socketServer from 'socket.io';
import color from 'colors';
import compression from 'compression';

import loadDataController from '../src/main/controllers/LoadDataController';
import emailController from '../src/main/controllers/EmailController';
import flowdockController from '../src/main/controllers/FlowdockController';

import schedule from 'node-schedule';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = http.Server(app);
const io = socketServer(server);

server.listen(port, function(err) {
    if (err) {
        console.log(err.red);
    }
    console.log(`Server listening over ${port}`.green);
});


/****************************************************************************************************** 
 * 
 *    Socket related code
 * 
******************************************************************************************************/
const connections = [];
io.on('connection', function(socket) {
  console.log('Created new socket connection ' + socket.id);
  connections.push(socket);
  socket.on('loadmonitor', function(data) {
    loadDataController.getAllData(socket);  
  });

  socket.on("sendemail", function(data) {
   // Send test email
    emailController.sendEmail(data);
  });
  socket.on("sendflowdock", function(data) {
    // Post flowdock message
    flowdockController.postMessage(data);
  });
  socket.on('disconnet', function() {
    console.log('disconnected from ' + socket.id);
  } );
});

schedule.scheduleJob('*/55 * * * *', function(socket) {
    let data = loadDataController.monitorData();
    // Send notification if enabled
    data.map(app => {
        if(app.notification) {
            if(app.flowdock) {
                flowdockController.postMessage({appName: app.appName, flowdock: app.flowdock, status: app.status, healthStatus: app.healthStatus, env: app.environment, displayName: app.displayName});
            }
            emailController.sendEmail({appName: app.appName, contactEmail: app.contactEmail, status: app.status, healthStatus: app.healthStatus, env: app.environment, displayName: app.displayName});
        }
    });
  }.bind(null, 'Hurray!! Scheduled job monitored the app.'));
// Need to set for email
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

