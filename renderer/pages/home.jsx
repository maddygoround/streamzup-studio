import React, { useEffect, useContext, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { Image, Layout, Tabs } from "antd";
import { ClientContext } from "../utils/ClientContext";
import { fetch } from "../utils/fetch";
import Devices from "../components/devices";
import Player from "../components/player";
import Overlays from "../components/controllers/overlay";
import WebcamController from "../components/controllers/webcam/webcam";
import QualityController from "../components/controllers/quality";
import ScenceSelector from "../components/controllers/scene";
import Wallpapers from "../components/controllers/wallpaper/wallpaper";
import Twitter from "../public/images/social/Facebook.svg";
import Youtube from "../public/images/social/Youtube.svg";
import Twitch from "../public/images/social/Twitch.svg";
import facebook from "../public/images/social/facebook.svg";

require("../styles/home.less");
const { TabPane } = Tabs;
function Home() {
  const { playback, overlay, peer } = useContext(ClientContext);
  const [state, setState] = playback;
  const [graphics, setGraphics] = overlay;
  const [peerManager] = peer;
  const canvasRef = useRef(null);
  const onLoadDevice = (deviceId) => {
    setState(() => ({
      ...state,
      selectedDevice: deviceId,
    }));
  };

  const onQualitySelect = (value) => {
    peerManager.changeQuality(value);
  };

  const onStartWebCam = () => {
    peerManager.startCamera();
  };

  const onStopWebCam = () => {
    peerManager.stopCamera();
  };

  const onSelectOverlay = (overlay) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedOverlay: overlay,
      }));
    }
  };

  const onSetPosition = (position) => {
    peerManager.setCameraPosition(position);
  };

  const onSelectWallpaper = (wallpaper) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedWallpaper: wallpaper,
      }));
    }
  };

  const onStartStream = () => {
    peerManager.startStream(canvasRef);
  };

  const onStopStream = () => {
    peerManager.stopStream();
  };

  const onScenceSelect = (scence) => {
    var src = "";
    switch (scence) {
      case "starting":
        src = "overlay.mp4";
        break;
      case "ending":
        src = "overlay3.mp4";
        break;
      case "break":
        src = "overlay2.mp4";
        break;
    }
    peerManager.selectScence(scence, src);
  };

  useEffect(() => {
    if (Object.keys(graphics.selectedOverlay).length > 0) {
      peerManager.setOverlay(graphics.selectedOverlay);
    }
  }, [graphics.selectedOverlay]);

  useEffect(() => {
    if (Object.keys(graphics.selectedWallpaper).length > 0) {
      peerManager.setWallpaper(graphics.selectedWallpaper);
    }
  }, [graphics.selectedWallpaper]);

  useEffect(() => {
    if (state.selectedDevice) {
      peerManager.peerInit(state.selectedDevice, canvasRef);
    }
  }, [state.selectedDevice]);

  useEffect(() => {
    setInterval(() => {
      fetch();
    }, 3000);
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="aside">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Layouts" key="1">
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Scenes</span>
                </div>
                <div className="cardContent">
                  <ScenceSelector
                    isDeviceSelected={state.selectedDevice ? true : false}
                    onScenceSelect={onScenceSelect}
                  />
                </div>
              </div>
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Camera Settings</span>
                </div>
                <div className="cardContent">
                  <WebcamController
                    state={state}
                    onStartWebCam={onStartWebCam}
                    onStopWebCam={onStopWebCam}
                    onSetPosition={onSetPosition}
                  />
                </div>
              </div>
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Wallpapers</span>
                </div>
                <div className="cardContent">
                  <Wallpapers
                    wallpapers={graphics.wallpapers}
                    onSelectWallpaper={onSelectWallpaper}
                  />
                </div>
              </div>
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Overlays</span>
                </div>
                <div className="cardContent">
                  <Overlays
                    overlays={graphics.overlays}
                    onSelectOverlay={onSelectOverlay}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Setup" key="2">
              Content of card tab 2
              <QualityController
                isDeviceSelected={state.selectedDevice ? true : false}
                onQualitySelect={onQualitySelect}
              />
            </TabPane>
          </Tabs>
        </div>
        <div className="mainContent">
          <div className="mainContentHeader border-bottom border-top d-flex align-items-center">
            <div className="ms-auto d-flex">
              <div className="px-3">Login</div>
              <div className="px-3">Help</div>
            </div>
          </div>
          <div className="subContent">
            <div className="streamSection">
              <div className="streamTitle">Stream Preview</div>
              <div className="streamPlayer">
                <Player
                  state={state}
                  onStartStream={onStartStream}
                  onStopStream={onStopStream}
                  canvasRef={canvasRef}
                />
              </div>
            </div>
            <div className="rightAside border-start">
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Social Connects</span>
                </div>
                <div className="cardContent">
                  <div className=" mb-1">Channels</div>
                  <div className="mb-3">

                  </div>
                  <div className=" mb-1">Options</div>
                  <ul className="list-unstyled">
                    <li>
                      <div className="socialBtn"><Image src={Twitter}/></div>
                    </li>
                    <li>
                      <div className="socialBtn"><Image src={Youtube}/></div>
                    </li>
                    <li>
                      <div className="socialBtn"><Image src={Twitch}/></div>
                    </li>
                    <li>
                      <div className="socialBtn"><Image src={facebook}/></div>
                    </li>
                   
                  </ul>
                </div>
              </div>
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Devices</span>
                </div>
                <div className="cardContent">
                  <Devices
                    devices={state.devices}
                    onLoadDevice={onLoadDevice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
