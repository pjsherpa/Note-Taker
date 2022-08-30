const express = require("express");
const noteRoutes = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helper/fsCodes");
const noteList = [];

// GET Route for notes
noteRoutes.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
noteRoutes.get("/notes/:note_id", (req, res) => {
  //using the params to create unique id
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

noteRoutes.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((results) => {
        results.push(newNote);

        writeToFile("./db/db.json", results);
        res.json(`note added successfully 🚀`);
      });
  } else {
    res.error("Error in adding note");
  }
});

// DELETE using route for specific note
noteRoutes.delete("/notes/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});
module.exports = noteRoutes;
