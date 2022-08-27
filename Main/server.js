const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
const htmlRouter = require("./routes/htmlRoutes");
const uuid = require("./helpers/uuid");
const apiRouter = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes", apiRouter);
app.use("/", htmlRouter);
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`APP listenening at http://localhost:${PORT}`)
);
