const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 6457;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/g", file: "gms.html" },
  { path: "/a", file: "aps.html" },
  { path: "/s", file: "set.html" },
  { path: "/x", file: "iframe.html" },
  { path: "/p", file: "prtnrs.html" },
  { path: "/startpage", file: "startpage.html" },
  { path: "/t", file: "tabs.html" },
  { path: "/404", file: "404.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});

app.use((req, res) => {
  res.redirect("/404");
});

const bareServer = createBareServer("/b/");
const server = http.createServer((req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
