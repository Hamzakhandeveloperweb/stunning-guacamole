require("dotenv").config()
const express = require("express");
const cors = require("cors");
const pg = require('pg');
pg.defaults.ssl = true;
const bodyParser = require('body-parser');
const SSE = require('express-sse');
const compression = require('compression');
const app = express();
const sse = new SSE();
const config = require('./app/config/db.config.js')
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const http = require('http');
const https = require('https');
app.use(compression());
const fs = require('fs');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const caBundle = fs.readFileSync('ca_bundle.crt', 'utf8');

var options = {
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.crt'),
  caBundle: fs.readFileSync('./ca_bundle.crt'),
};

const client = new pg.Client({
  user: config.USER,
  host: config.HOST,
  database: 'postgres',
  password: config.PASSWORD,
  port: 5432,
  ssl: true
});


client.connect().then(()=> {
  console.log("connected")
})

const allowedOrigins = ['https://main.d6fgzhhovlp7j.amplifyapp.com',"http://localhost:3001","https://www.hylapps.com","https://www.hylapps.com/"];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models/index.js");
const { userBoard } = require("./app/controllers/user.controller.js");
const Role = db.role;
const User = db.user;
const Company = db.company;
const Terminal = db.terminal;
const Berth = db.berth;
const Ship = db.ship;
const Permission = db.permission;
const Voyage = db.voyage;
const EventType = db.eventType;
const EventPermissions = db.userEventPermissions

// routes
require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/common.routes.js')(app);

const connectedClients = {};
let userId

// app.get('/sse', (req, res,next) => {
//     // Store the SSE object associated with this user
//     const userId = req.query.userId;
//     connectedClients[userId] = res; // Store the response object
  
//     // Set SSE-specific headers
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');
//     res.flushHeaders(); // Send the headers to the client
  
//     // Simulate SSE data (replace this with your data source)
//     setInterval(() => {
//       const eventData = 'Your SSE data here';
//       res.write(`data: ${JSON.stringify(eventData)}\n\n`); // Send data to the client
//     }, 1000);
  
//     // Handle client disconnect (optional)
//     req.on('close', () => {
//       delete connectedClients[userId]; // Remove the client from your connected clients list
//       res.end(); // End the response
//     });
// });

// // Send events to specific users
// function sendEventToUser(userId, eventData) {
//   const client = connectedClients[userId];
//   if (client) {
//     client.send(eventData);
//   }
// }

// // Example route to send an event to a specific user
// app.post('/sendEvent', (req, res) => {
//   const { userId, event } = req.body;
//   sendEventToUser(userId, event);
//   res.sendStatus(200);
// });

// eventEmitter.on('notification', (message) => {
//   console.log(`Received notification: ${message}`);
// });


// // set port, listen for requests
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const server = https.createServer(options, app, (req, res) => {
  res.writeHead(200);
  res.end('Hello, secure world!\n');
});

app.listen(PORT, () => {
  console.log(`Server is running on HTTPS port ${PORT}`);
});