import { ipcMain } from "electron";
import express from "express";
import http from "http";
import socket from "socket.io";
import QRCode from "qrcode";
import routes from "./routes";
import store from "./store";
import pubsub from "./pubsub";
import { networkInterfaces } from "os";

const getIPAddress = () => {
  var interfaces = networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      )
        return alias.address;
    }
  }
  return "0.0.0.0";
};

const port = 3001;
const streams = store();
const app = express();
const httpServer = http.Server(app);
routes(app, streams);
httpServer.listen(port);

const io = socket(httpServer);
pubsub(io, streams);

ipcMain.on("fetchqrcode", async (event, arg) => {
  event.sender.send(
    "qrcode",
    await QRCode.toDataURL(`${getIPAddress()}:${port}`)
  );
});

ipcMain.on("fetchDevices", (event, arg) => {
  event.sender.send("devices", streams.getStreams());
});

// ipcMain.on('ping-pong', (event, arg) => {
//     event.sender.send('ping-pong', `[ipcMain] "${arg}" received asynchronously.`);
//   });

//   ipcMain.on('ping-pong-sync', (event, arg) => {
//     event.returnValue = `[ipcMain] "${arg}" received synchronously.`;
//   });
