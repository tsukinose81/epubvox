const fs = require("fs");

const readFile = (path) => {
  return fs.readFileSync(path, "utf-8");
};

// create directory if not exists
const createDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

module.exports = { readFile, createDirectory };
