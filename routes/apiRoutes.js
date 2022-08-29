const express = require("express");
const apiRoutes = express.Router();
const fs = require("fs");
const uuid = require("../helpers/uuid");
const path = require("path");
const db = require("../db/db.json");

apiRoutes.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
apiRoutes.get("/notes", (req, res) => {
  res.json(`${req.method} request received to get note`);
});

apiRoutes.post("/notes", (req, res) => {
  res.json(`${req.method} request received to add a note`);
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);
    // Write the string to a file
    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Notes for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting notes");
  }
});

module.exports = apiRoutes;
