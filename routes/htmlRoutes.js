const apiRoutes = require("./apiRoutes");

const htmlRoutes = require("express").Router();

htmlRoutes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

module.exports = htmlRoutes;