const express = require("express");
const serveStatic = require("serve-static");
const proxy = require("express-http-proxy");
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

  next();
});

//Configure the Vue app
vueApp.use(serveStatic(__dirname + "/dist"));

const vueHttpServer = http.createServer(vueApp);
//const vueHttpsServer = https.createServer(credentials, vueApp);

vueHttpServer.listen(vueHttpListenerPort);
console.log(`Serving Vue app on HTTP port ${vueHttpListenerPort}`);

//Proxy server
const proxyHttpListenerPort = 3000;
const proxyApp = express();

proxyApp.use(cors(corsConfig));

const proxyHttpServer = http.createServer(proxyApp);
//const proxyHttpsServer = https.createServer(credentials, proxyApp);

const backendHost = "https://nas.edietrich.com:443/";

//Log proxy requests
proxyApp.use((req, _res, next) => {
  console.log(
    `Host ${req.headers.host} proxying ${req.method} on ${req.originalUrl} from ${req.headers.origin} to ${backendHost}.`
  );
  next();
});

//Return 200 for preflight
proxyApp.options("/", function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

proxyApp.use((req, res, next) => {
  if (req.method === "OPTIONS") res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT"
  );

  next();
});

//Configure the proxy
proxyApp.use(
  "/api",
  proxy(backendHost, {
    proxyReqOptDecorator: (proxyReqOpts) => {
      proxyReqOpts.headers["x-api-key"] =
        "917bac03-ca89-49dc-8c6b-ea1a62ceea11";
      proxyReqOpts.headers["Access-Control-Allow-Origin"] = "*";
      proxyReqOpts.headers["Access-Control-Allow-Methods"] =
        "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT";
      proxyReqOpts.headers["Origin"] = "http://localhost:8080";
      proxyReqOpts.headers["Host"] = "192.168.86.29:49155";

      return proxyReqOpts;
    },
  })
);

proxyHttpServer.listen(proxyHttpListenerPort);
console.log(`Proxy listening on HTTP port ${proxyHttpListenerPort}`);
//httpsServer.listen(httpsListenerPort);
