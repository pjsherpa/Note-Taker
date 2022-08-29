const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");
const uuid = require("../helpers/uuid");
const path = require("path");
const db = require("../db/db.json");
const noteList = [];

apiRoutes.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
apiRoutes.get("/notes", (req, res) => {
  res.json(`${req.method} request received to get note`);
});

// GET Route for notes
apiRoutes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

apiRoutes.post("/notes", (req, res) => {
  res.json(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);
    // Wrote the string to a file
    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Notes for ${newNote.title} has been written to JSON file`
          )
    );
    noteList.push(newNote);
    const response = {
      status: "success",
      body: noteList,
    };
    console.log(response);
  } else {
    res.status(500).json("Error in posting notes");
  }
});

// POST Route for a new UX/UI note
apiRoutes.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    fs.readFile(newTip, "./db/db.json");
    const parsedData = JSON.parse(newTip);
    parsedData.push(noteString);
    res.json(`notes added successfully 🚀`);
  } else {
    res.error("Error in adding notes");
  }
});

module.exports = apiRoutes;
