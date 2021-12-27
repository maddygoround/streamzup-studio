import { ipcRenderer } from "electron";

export const fetch = () => {
  ipcRenderer.send("fetchDevices", null);
};

export const fetchQR = () => {
  ipcRenderer.send("fetchqrcode", null);
};