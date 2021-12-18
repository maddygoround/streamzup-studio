import React, { useState, createContext, useEffect } from "react";
import { ipcRenderer } from "electron";
import { fetch } from "./fetch";
import Emitter from "./Emitter";
import { PeerManager } from "./PeerManager";

const ClientContext = createContext([{}, () => { }]);

const ClientProvider = (props) => {
    const [state, setState] = useState({
        devices: [],
        selectedDevice: undefined,
        canvasEnabled: false,
        streamEnabled: false
    });

    const [peerManager,setPeerManager] = useState();

    const [graphics, setGraphics] = useState({
        overlays: [],
        selectedOverlay: {}
    });

    const fetchDevices = () => {
        var groups = [];
        fetch();
        ipcRenderer.on("devices", (event, arg) => {

            if (!arg.length) {
                setState(() => ({
                    ...state
                }));
            }

            groups = arg;

            groups.forEach((element) => {
                setState((prevState) => ({
                    ...prevState,
                    devices: [
                        ...state.devices,
                        { name: element.name, selected: false, id: element.id },
                    ],
                }));

            });
        });
    };


    useEffect(() => {
        fetchDevices();
        Emitter.off("canvas-status").on(
            "canvas-status",
            (arg) => {
                if (!arg.canvasEnabled) {
                    setState(() => ({
                        ...state,
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
            overlays: [
                { url: 'images/overlays/overlay.png', name: 'Pink Panther', coordinates: { feed: { x: 270, y: 98, height: 1.55, width: 1.45 }, camera: { x: 21, y: 94, height: 135, width: 210 } } },
                { url: 'images/overlays/overlay2.png', name: 'Bule Panther', coordinates: { feed: { x: 35, y: 105, height: 1.48, width: 1.45 },camera: { x: 270, y: 98, height: 1.55, width: 1.45 } }  },
                { url: 'images/overlays/overlay4.png', name: 'Purple Panther', coordinates: { feed: { x: 25, y: 130, height: 1.8, width: 1.75 },camera: { x: 270, y: 98, height: 1.55, width: 1.45 } }  } ]
        }));

        setPeerManager(new PeerManager());
    }, []);

    return (
        <ClientContext.Provider
            value={{
                playback: [state, setState],
                overlay: [graphics, setGraphics],
                peer : [peerManager,setPeerManager]
            }}
        >
            {props.children}
        </ClientContext.Provider>
    );
};



export { ClientContext, ClientProvider };
