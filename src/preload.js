const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mainWorld", {
  chooseEPUB: () => ipcRenderer.invoke("chooseEPUB"),
  exec: (target) => ipcRenderer.invoke("exec", target),
});
