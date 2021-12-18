import { ipcMain } from 'electron';
import express from 'express';
import http from 'http';
import socket from 'socket.io';
import routes from './routes';
import store from './store';
import pubsub from './pubsub';
const streams = store();
const app = express();
const httpServer = http.Server(app);
routes(app, streams);

httpServer.listen(3001);

const io = socket(httpServer);

pubsub(io, streams);

ipcMain.on('fetchDevices', (event, arg) => {
    event.sender.send('devices', streams.getStreams());
});
// ipcMain.on('ping-pong', (event, arg) => {
//     event.sender.send('ping-pong', `[ipcMain] "${arg}" received asynchronously.`);
//   });

//   ipcMain.on('ping-pong-sync', (event, arg) => {
//     event.returnValue = `[ipcMain] "${arg}" received synchronously.`;
//   });