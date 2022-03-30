const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const http = require("http");
//const https = require("https");
//const fs = require("fs");

//Shared
const corsConfig = {
  origin: true,
  credentials: true,
};

//Proxy server
const proxyHttpListenerPort = 3000;
//const proxyHttpsListenerPort = 3000;
const proxyApp = express();
proxyApp.use(cors(corsConfig));

//Cert
/*const credentials = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};*/

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
  res.header("Access-Control-Allow-Private-Network", true);
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
  res.header("Access-Control-Allow-Private-Network", true);

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
      proxyReqOpts.headers["Origin"] = "http://localhost:80";

      return proxyReqOpts;
    },
  })
);

const proxyHttpServer = http.createServer(proxyApp);
//const proxyHttpsServer = https.createServer(credentials, proxyApp);
proxyHttpServer.listen(proxyHttpListenerPort, () => {
  console.log(`Proxy listening on HTTP port ${proxyHttpListenerPort}`);
});

/*proxyHttpsServer.listen(proxyHttpsListenerPort, () => {
  console.log(`Proxy listening on HTTPS port ${proxyHttpsListenerPort}`);
});*/
