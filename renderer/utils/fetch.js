import { ipcRenderer } from "electron";

export const fetch = () => {
  ipcRenderer.send("fetchDevices", null);
};