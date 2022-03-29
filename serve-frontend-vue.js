const express = require("express");
const serveStatic = require("serve-static");
const cors = require("cors");
const http = require("http");
//const https = require("https");

//Shared
const corsConfig = {
  origin: true,
  credentials: true,
};

//Vue frontend server
const vueHttpListenerPort = process.env.PORT || 80;
const vueApp = express();

vueApp.use(cors(corsConfig));

vueApp.use((req, res, next) => {
  if (req.method === "OPTIONS") res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  next();
});

//Configure the Vue app
vueApp.use(serveStatic(__dirname + "/dist"));

const vueHttpServer = http.createServer(vueApp);
//const vueHttpsServer = https.createServer(credentials, vueApp);

vueHttpServer.listen(vueHttpListenerPort);
console.log(`Serving Vue app on HTTP port ${vueHttpListenerPort}`);
