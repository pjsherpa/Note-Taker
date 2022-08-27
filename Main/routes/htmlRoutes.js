const htmlRoutes = require("express").Router();
const apiRoutes = require("./apiRoutes");
const uuid = require("../helpers/uuid");

htmlRoutes.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

htmlRoutes.get("/notes", (req, res) =>
  //error here
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

module.exports = htmlRoutes;
