const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");
const util = require("util");
const uuid = require("../helpers/uuid");
const readFromFile = util.promisify(fs.readFileSync);
const writeFromFile = util.promisify(fs.writeFileSync);

apiRoutes.post("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

apiRoutes.get("/notes", (req, res) => res.sendFile(path.join("/db/db.json")));

apiRoutes.post("/notes", (req, res) => {
  const notes = JSON.parse(readFromFile("/db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid();
  notes.push(newNotes);
  writeFromFile("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

module.exports = apiRoutes;
