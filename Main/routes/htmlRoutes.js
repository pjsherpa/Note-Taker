const apiRoutes = require("./apiRoutes");

const htmlRoutes = require("express").Router();
// const apiRoutes = require("./apiRoutes");

htmlRoutes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

apiRoutes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

module.exports = htmlRoutes;
