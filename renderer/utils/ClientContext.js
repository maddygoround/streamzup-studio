import React, { useState, createContext, useEffect } from "react";
import { ipcRenderer } from "electron";
import { fetch, fetchQR } from "./fetch";
import Emitter from "./Emitter";
import { PeerManager } from "./PeerManager";

const ClientContext = createContext([{}, () => { }]);

const ClientProvider = (props) => {
    const [state, setState] = useState({
        devices: [],
        selectedDevice: undefined,
        qrcode: undefined,
        canvasEnabled: false,
        streamEnabled: false
    });

    const [peerManager, setPeerManager] = useState();

    const [graphics, setGraphics] = useState({
        overlays: [],
        wallpapers: [],
        selectedOverlay: {},
        selectedWallpaper: undefined,
        starting: "overlays/starting/default.mp4",
        ending: "overlays/ending/default.mp4",
        break: "overlays/break/default.mp4"
    });

    const fetchDevices = () => {
        var groups = [];
        fetch();
        ipcRenderer.on("devices", (event, arg) => {

            if (!arg.length) {
                setState((prevState) => ({
                    ...prevState
                }));
            }

            groups = arg;

            groups.forEach((element) => {
                setState((prevState) => ({
                    ...prevState,
                    devices: [
                        { name: element.name, selected: false, id: element.id },
                        ...state.devices
                    ],
                }));

            });
        });
    };

    const fetchQRCode = () => {
        fetchQR();
        ipcRenderer.on("qrcode", (event, arg) => {
            if (!arg.length) {
                setState((prevState) => ({
                    ...prevState
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    qrcode: arg
                }));
            }
        });
    };


    useEffect(() => {
        fetchDevices();
        fetchQRCode();
        Emitter.off("canvas-status").on(
            "canvas-status",
            (arg) => {
                if (!arg.canvasEnabled) {
                    setState((prevState) => ({
                        ...prevState,
                        selectedDevice: undefined,
                        canvasEnabled: arg.canvasEnabled
                    }));
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        canvasEnabled: arg.canvasEnabled
                    }));
                }
            });

        Emitter.off("stream-status").on(
            "stream-status",
            (arg) => {
                setState((prevState) => ({
                    ...prevState,
                    streamEnabled: arg.streamEnabled
                }));
            });

        setGraphics(() => ({
            ...graphics,
            wallpapers: [
                'images/backgrounds/image1.webp',
                'images/backgrounds/image2.webp',
                'images/backgrounds/image3.webp',
                'images/backgrounds/image4.webp',
            ],
            credits: {
                starting: [
                    'overlays/starting/pubg.mp4',
                    'overlays/starting/angry_bird.mp4',
                    'overlays/starting/free.mp4',
                    'overlays/starting/default.mp4'
                ],
                ending: [
                    'overlays/ending/pubg.mp4',
                    'overlays/ending/angry_bird.mp4',
                    'overlays/ending/free.mp4',
                    'overlays/ending/default.mp4'
                ],
                break: [
                    'overlays/break/pubg.mp4',
                    'overlays/break/angry_bird.mp4',
                    'overlays/break/free.mp4',
                    'overlays/break/default.mp4'
                ]
            },
            overlays: [
                { url: 'images/overlays/overlay.png', name: 'Pink Panther', coordinates: { feed: { x: 270, y: 98, height: 1.55, width: 1.45 }, camera: { x: 21, y: 94, height: 135, width: 210 } } },
                { url: 'images/overlays/overlay2.png', name: 'Bule Panther', coordinates: { feed: { x: 35, y: 105, height: 1.48, width: 1.45 }, camera: { x: 270, y: 98, height: 1.55, width: 1.45 } } },
                { url: 'images/overlays/overlay4.png', name: 'Purple Panther', coordinates: { feed: { x: 25, y: 130, height: 1.8, width: 1.75 }, camera: { x: 270, y: 98, height: 1.55, width: 1.45 } } }]
        }));

        setPeerManager(new PeerManager());
    }, []);

    return (
        <ClientContext.Provider
            value={{
                playback: [state, setState],
                overlay: [graphics, setGraphics],
                peer: [peerManager, setPeerManager]
            }}
        >
            {props.children}
        </ClientContext.Provider>
    );
};



export { ClientContext, ClientProvider };
