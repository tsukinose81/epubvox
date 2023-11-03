const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const chooseEPUB = require("./choose-epub");
const exec = require("./exec");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("src/render/index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("chooseEPUB", () => chooseEPUB());
  ipcMain.handle("exec", (e, target) => exec(target));

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
