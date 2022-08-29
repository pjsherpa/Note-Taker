const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");
const util = require("util");
const id = require("uuid");
const path = require("path");
const db = require("../db/db.json");

apiRoutes.get("/api/notes", (req, res) =>
  res.sendFile(path.join("/db/db.json"))
);

module.exports = apiRoutes;
