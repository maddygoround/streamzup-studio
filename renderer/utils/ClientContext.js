import React, { useState, createContext, useEffect } from "react";
import { ipcRenderer } from "electron";
import { fetch, fetchQR } from "./fetch";
import Emitter from "./Emitter";
import { PeerManager } from "./PeerManager";

const ClientContext = createContext([{}, () => {}]);

const ClientProvider = (props) => {
  const [state, setState] = useState({
    devices: [],
    selectedDevice: undefined,
    qrcode: undefined,
    canvasEnabled: false,
    streamEnabled: false,
    streamUrl: "",
  });

  const [peerManager, setPeerManager] = useState();

  const [graphics, setGraphics] = useState({
    overlays: [],
    wallpapers: [],
    selectedOverlay: {},
    selectedWallpaper: undefined,
    starting: "overlays/starting/default.mp4",
    ending: "overlays/ending/default.mp4",
    break: "overlays/break/default.mp4",
  });


  const fetchDevices = () => {
    var groups = [];
    fetch();
    ipcRenderer.on("devices", (event, arg) => {
      if (!arg.length) {
        setState((prevState) => ({
          ...prevState,
        }));
      }

      groups = arg;

      groups.forEach((element) => {
        setState((prevState) => ({
          ...prevState,
          devices: [
            { name: element.name, selected: false, id: element.id },
            ...state.devices,
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
          ...prevState,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          qrcode: arg,
        }));
      }
    });
  };

  useEffect(() => {
    fetchDevices();
    fetchQRCode();
    Emitter.off("canvas-status").on("canvas-status", (arg) => {
      if (!arg.canvasEnabled) {
        setState((prevState) => ({
          ...prevState,
          selectedDevice: undefined,
          canvasEnabled: arg.canvasEnabled,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          canvasEnabled: arg.canvasEnabled,
        }));
      }
    });

    Emitter.off("stream-status").on("stream-status", (arg) => {
      setState((prevState) => ({
        ...prevState,
        streamEnabled: arg.streamEnabled,
      }));
    });

    setGraphics(() => ({
      ...graphics,
      wallpapers: [
        "images/backgrounds/image1.webp",
        "images/backgrounds/image2.webp",
        "images/backgrounds/image3.webp",
        "images/backgrounds/image4.webp",
      ],
      credits: {
        starting: [
          "overlays/starting/pubg.mp4",
          "overlays/starting/angry_bird.mp4",
          "overlays/starting/free.mp4",
          "overlays/starting/default.mp4",
        ],
        ending: [
          "overlays/ending/pubg.mp4",
          "overlays/ending/angry_bird.mp4",
          "overlays/ending/free.mp4",
          "overlays/ending/default.mp4",
        ],
        break: [
          "overlays/break/pubg.mp4",
          "overlays/break/angry_bird.mp4",
          "overlays/break/free.mp4",
          "overlays/break/default.mp4",
        ],
      },
      overlays: [
        // { url: 'images/overlays/overlay_t.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 654, y: 58, height: 81, width: 154 } } },
        // { url: 'images/overlays/overlay_t2.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 0, y: 178, height: 145, width: 170 } } },
        // { url: 'images/overlays/overlay_t3.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t4.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t5.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t6.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 0, y: 335, height: 90, width: 160 } } },
        // { url: 'images/overlays/overlay_t7.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t8.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: {enabled: true, x: 20, y: 330, height: 113, width: 190 } } },
        // { url: 'images/overlays/overlay_t9.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t10.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false} } },
        // { url: 'images/overlays/overlay_t11.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true , x: 20, y: 355, height: 90, width: 160 } } },
        // { url: 'images/overlays/overlay_t12.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 630, y: 5, height: 110, width: 210 }  } },
        // { url: 'images/overlays/overlay_t13.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false }  } },
        // { url: 'images/overlays/overlay_t14.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false }  } },
        // { url: 'images/overlays/overlay_t15.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true , x: 5, y: 355, height: 86, width: 154 }   } },
        // { url: 'images/overlays/overlay_t16.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false }  } },
        // { url: 'images/overlays/overlay_t17.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: false }  } },
        // { url: 'images/overlays/overlay_t18.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 5, y: 290, height: 82, width: 134 }  } },
        // { url: 'images/overlays/overlay_t19.png', name: 'Purple Panther', coordinates: { feed: { x: 0, y: 40, height: 1, width: 1 }, camera: { enabled: true, x: 670, y: 40, height: 80, width: 160 }  } },
        {
          url: "images/overlays/overlay_t20.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 11, y: 60, height: 1.15, width: 1.35 },
            camera: { enabled: true, x: 620, y: 310, height: 160, width: 210 },
          },
        },
        {
          url: "images/overlays/overlay_t21.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 15, y: 85, height: 1.22, width: 1.44 },
            camera: { enabled: true, x: 620, y: 310, height: 160, width: 210 },
          },
        },
        {
          url: "images/overlays/overlay_t22.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 25, y: 55, height: 1.14, width: 1.32 },
            camera: { enabled: true, x: 670, y: 310, height: 160, width: 160 },
          },
        },
        {
          url: "images/overlays/overlay_t23.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 15, y: 60, height: 1.1, width: 1.3 },
            camera: { enabled: true, x: 670, y: 310, height: 160, width: 160 },
          },
        },
        {
          url: "images/overlays/overlay_t24.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 160, y: 50, height: 1.1, width: 1.28 },
            camera: { enabled: true, x: 0, y: 310, height: 160, width: 160 },
          },
        },
        {
          url: "images/overlays/overlay_t25.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 20, y: 70, height: 1.22, width: 1.5 },
            camera: { enabled: true, x: 620, y: 310, height: 140, width: 210 },
          },
        },
        {
          url: "images/overlays/overlay_t26.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 185, y: 65, height: 1.11, width: 1.3 },
            camera: { enabled: true, x: 0, y: 295, height: 160, width: 160 },
          },
        },
        {
          url: "images/overlays/overlay_t27.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 15, y: 50, height: 1.1, width: 1.28 },
            camera: { enabled: true, x: 670, y: 310, height: 160, width: 160 },
          },
        },
        {
          url: "images/overlays/overlay_t28.png",
          name: "Purple Panther",
          border: true,
          coordinates: {
            feed: { x: 30, y: 92, height: 1.28, width: 1.49 },
            camera: { enabled: true, x: 620, y: 270, height: 160, width: 210 },
          },
        },
      ],
    }));

    setPeerManager(new PeerManager());
  }, []);

  return (
    <ClientContext.Provider
      value={{
        playback: [state, setState],
        overlay: [graphics, setGraphics],
        peer: [peerManager, setPeerManager],
        
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
