const { ipcRenderer } = require("electron");

// Exposing ipcRenderer to guest webview, to send messages
global.ipcRenderer = ipcRenderer;
