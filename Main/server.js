const express = require("express");
const path = require("path");
const htmlRouter = require("./routes/htmlRoutes");
const apiRouter = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", htmlRouter);
app.use("/notes", apiRouter);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`APP listenening at http://localhost:${PORT}`)
);
