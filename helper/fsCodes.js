const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (file, note) =>
  fs.writeFile(file, JSON.stringify(note, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${file}`)
  );

module.exports = { readFromFile, writeToFile };
