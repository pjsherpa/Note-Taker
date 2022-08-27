const express = require("express");
const apiRoutes = express.Router();
const { v4: uuidv4 } = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const htmlRoutes = require("./htmlRoutes");

// const readFromFile = util.promisify(fs.readFile);
apiRoutes.get("/notes", (req, res) =>
  //error here
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

apiRoutes.get("/notes", function (req, res) {
  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

apiRoutes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

apiRoutes.get("/:apiRoutes_id", (req, res) => {
  const apiRoutesID = req.params.apiRoutes_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter(
        (apiRoutes) => apiRoutes.apiRoutes_id === apiRoutesID
      );
      return result.length > 0
        ? res.json(result)
        : res.json("No notes with that ID");
    });
});
apiRoutes.delete("/:apiRoutes_id", (req, res) => {
  const apiRoutesID = req.params.apiRoutes_id;
  readFromFile("./db/apiRoutes.json")
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

  const { noteList } = req.body;

  if (req.body) {
    const apiRoutes = {
      apiRoutes,
      noteList,
      apiRoutes_id: uuidv4(),
    };

    readAndAppend(apiRoutes, "./db/db.json");

    res.json(`apiRoutes added successfully`);
  } else {
    res.error("Error in adding apiRoutes");
  }
});

module.exports = apiRoutes;
