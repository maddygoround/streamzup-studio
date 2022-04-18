import { ipcMain } from 'electron';
import express from 'express';
import http from 'http';
import socket from 'socket.io';
import QRCode from 'qrcode';
import routes from './routes';
import store from './store';
import pubsub from './pubsub';
import net from 'net';

const getNetworkIP = () => {
    return new Promise((resolve, reject) => {
        var socket = net.createConnection(80, 'www.google.com');
        socket.on('connect', function () {
            resolve(socket.address().address);

            socket.end();
        });
        socket.on('error', function (e) {
            reject(e);

        });
    })
}


const port = 3001;
const streams = store();
const app = express();
const httpServer = http.Server(app);
routes(app, streams);
httpServer.listen(port);

const io = socket(httpServer);
pubsub(io, streams);

ipcMain.on("fetchqrcode", async (event, arg) => {
    event.sender.send("qrcode", await QRCode.toDataURL(`${await getNetworkIP()}:${port}`));
});

ipcMain.on('fetchDevices', (event, arg) => {
    event.sender.send('devices', streams.getStreams());
});

// ipcMain.on('ping-pong', (event, arg) => {
//     event.sender.send('ping-pong', `[ipcMain] "${arg}" received asynchronously.`);
//   });

//   ipcMain.on('ping-pong-sync', (event, arg) => {
//     event.returnValue = `[ipcMain] "${arg}" received synchronously.`;
//   });