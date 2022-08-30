const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (file, note) =>
  fs.writeFile(file, JSON.stringify(note, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${file}`)
  );

const readAndAppend = (note, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };