const express = require("express");
const apiRoutes = express.Router();
const notes = require("../helpers/uuid");
const { newNote, appendNote, deleteNote } = require("../helpers/fsUtils");

apiRoutes.post("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

apiRoutes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

apiRoutes.delete("/:apiRoutes_id", (req, res) => {
  const apiRoutesID = req.params.apiRoutes_id;
  readFromFile("./db/db.json", "utf8")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter(
        (apiRoutes) => apiRoutes.apiRoutes_id !== apiRoutesID
      );

      writeToFile("./db/db.json", result);

      res.json(`Item ${apiRoutes} has been deleted`);
    });
});

apiRoutes.post("/", (req, res) => {
  console.log(req.body);

  const notelist = req.body;

  if (req.body) {
    const apiRoutes = {
      apiRoutes,
      notelist,
      apiRoutes_id: uuid(),
    };

    readAndAppend(apiRoutes, "./db/db.json");

    res.json(`apiRoutes added successfully`);
  } else {
    res.error("Error in adding apiRoutes");
  }
});

module.exports = apiRoutes;
