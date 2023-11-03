const { app, dialog } = require("electron");
const fs = require("fs");
// const unzipper = require("unzipper");
const AdmZip = require("adm-zip");
const path = require("path");
const { createDirectory } = require("./utils");

const chooseEPUB = () => {
  const epubPath = getEPUBPath();
  if (!epubPath) return;

  const userDataPath = app.getPath("userData");
  const libraryPath = path.join(userDataPath, "library");

  const target = {};
  target.name = path.basename(epubPath, path.extname(epubPath));
  target.path = path.join(libraryPath, target.name);

  const zipPath = path.join(libraryPath, `${target.name}.zip`);

  createDirectory(libraryPath);

  // epub to zip
  fs.copyFileSync(epubPath, zipPath);

  // unzip and remove zip
  // fs.createReadStream(zipPath)
  //   .pipe(unzipper.Extract({ path: target.path }))
  //   .on("close", () => {
  //     fs.unlinkSync(zipPath);
  //   });
  const zip = new AdmZip(zipPath);
  zip.extractAllToAsync(target.path, true, (err) => {
    if (err) throw new Error(err);
    fs.unlinkSync(zipPath);
  });

  return target;
};

const getEPUBPath = () => {
  const options = {
    filters: [{ name: "EPUB", extensions: ["epub"] }],
  };
  // open dialog
  const epubFiles = dialog.showOpenDialogSync(options);
  return epubFiles ? epubFiles[0] : null;
};

module.exports = chooseEPUB;
