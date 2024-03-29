import React, { useEffect, useContext, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Image, Layout, Tabs, Radio, Button } from "antd";
import { ClientContext } from "../utils/ClientContext";
import { fetch } from "../utils/fetch";
import Devices from "../components/devices";
import Player from "../components/player";
import Overlays from "../components/controllers/overlay";
import WebcamController from "../components/controllers/webcam/webcam";
import QualityController from "../components/controllers/quality";
import ScenceSelector from "../components/controllers/scene";
import Gallery from "../components/controllers/gallery/gallery";
import Twitter from "../public/images/social/twitter.svg";
import Youtube from "../public/images/social/youtube.svg";
import Twitch from "../public/images/social/twitch.svg";
import facebook from "../public/images/social/facebook.svg";

require("../styles/home.less");

const { TabPane } = Tabs;
function Home() {
  const { playback, overlay, peer } = useContext(ClientContext);
  const [state, setState] = playback;
  const [graphics, setGraphics] = overlay;
  const [peerManager] = peer;
  const canvasRef = useRef(null);
  const [webcamStatus, setWebcamStatus] = React.useState(false);
  const [selectedGraphicContainer, setSelectedGraphicContainer] = useState("main");
  const [selectedPosition, setSelectedPosition] = useState("bottom-left");

  const onLoadUnloadDevice = (deviceId) => {
    if (!state.selectedDevice || state.selectedDevice !== deviceId) {
      setState(() => ({
        ...state,
        selectedDevice: deviceId,
      }));
    } else {
      if (state.selectedDevice === deviceId) {
        peerManager.release(deviceId);
        setWebcamStatus(false);
        setState(() => ({
          ...state,
          selectedDevice: undefined,
        }));
      }
    }
  };

  const onQualitySelect = (value) => {
    peerManager.changeQuality(value);
  };


  const onWebCamStatusChange = (e) => {
    if (state.selectedDevice) {
      setWebcamStatus(e.target.checked);
    }
  };

  const onSelectOverlay = (event) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedOverlay: event.target.value,
      }));
    }
  };

  const onSetPosition = (e) => {
    if (state.selectedDevice) {
      setSelectedPosition(e.target.value);
    }
  };

  const onSelectWallpaper = (event) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedWallpaper: event.target.value,
      }));
    }
  };

  const onStartStream = () => {
    if (state.selectedDevice) {
      peerManager.startStream(canvasRef);
    }
  };

  const onStopStream = () => {
    if (state.selectedDevice) {
      peerManager.stopStream();
    }
  };

  const onScenceSelect = (scence) => {
    setSelectedGraphicContainer(scence.key);
    switch (scence.key) {
      case "starting":
      case "ending":
      case "break":
        peerManager.selectScence(scence.key, graphics[scence.key]);
        break;
      default:
        peerManager.selectScence(scence.key, "");
        break;
    }
  };


  const onSelectCredit = (event) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        [selectedGraphicContainer]: event.target.value,
      }));
      peerManager.selectScence(selectedGraphicContainer, event.target.value);
    }
  }

  useEffect(() => {
    if (state.selectedDevice) {
      peerManager.setCameraPosition(selectedPosition);
    }
  }, [selectedPosition]);

  useEffect(() => {
    if (state.selectedDevice) {
      if (webcamStatus) {
        peerManager.startCamera();
        peerManager.setCameraPosition(selectedPosition);
      } else {
        peerManager.stopCamera();
      }
    }
  }, [webcamStatus]);

  useEffect(() => {
    if (Object.keys(graphics.selectedOverlay).length > 0) {
      peerManager.setOverlay(graphics.selectedOverlay);
    }
  }, [graphics.selectedOverlay]);

  useEffect(() => {
    if (graphics.selectedWallpaper) {
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
                    value={selectedGraphicContainer}
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
                    isDeviceSelected={state.selectedDevice}
                    value={webcamStatus}
                    posValue={selectedPosition}
                    onWebCamStatusChange={onWebCamStatusChange}
                    // onStopWebCam={onStopWebCam}
                    onSetPosition={onSetPosition}
                  />
                </div>
              </div>
              {selectedGraphicContainer === "main" && (
                <div className="cardSection">
                  <div className="cardTitle">
                    <span>Wallpapers</span>
                  </div>
                  <div className="cardContent">
                    <Gallery
                      value={graphics.selectedWallpaper}
                      gallery={graphics.wallpapers}
                      type="img"
                      onSelectGalleryItem={onSelectWallpaper}
                    />
                  </div>
                </div>
              )}
              {(selectedGraphicContainer === "starting" || selectedGraphicContainer === "ending" || selectedGraphicContainer === "break") && (
                <div className="cardSection">
                  <div className="cardTitle">
                    <span>Gallery</span>
                  </div>
                  <div className="cardContent">
                    <Gallery
                      value={graphics[selectedGraphicContainer]}
                      gallery={graphics.credits[selectedGraphicContainer]}
                      type="video"
                      onSelectGalleryItem={onSelectCredit}
                    />
                  </div>
                </div>
              )}
              {selectedGraphicContainer === "overlay" && (
                <div className="cardSection">
                  <div className="cardTitle">
                    <span>Overlays</span>
                  </div>
                  <div className="cardContent">
                    <Overlays
                      value={graphics.selectedOverlay}
                      overlays={graphics.overlays}
                      onSelectOverlay={onSelectOverlay}
                    />
                  </div>
                </div>
              )}
            </TabPane>
            <TabPane tab="Setup" key="2">
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
              <div className="px-3"> <span>Help</span></div>
            </div>
          </div>
          <div className="subContent">
            <div className="streamSection">
              <div className="streamTitle">Stream Preview</div>
              <div className="streamPlayer border-bottom">
                <Player
                  canvasRef={canvasRef}
                />
              </div>

              <div className="cardSection">
                <div className="cardTitle">
                  <span>Stream Information</span>
                </div>
                <div className="cardContent">
                  <div className="streamInfoDetails d-flex">
                    {/* <div className="w-75">
                      <SteamInfo
                        src={Beard}
                        title="krunal"
                        details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia hic, eaque sint praesentium error exercitationem ab culpa nam iste a temporibus esse, quia assumenda sequi ducimus dolores debitis quibusdam eligendi."
                        username="nikrunic"
                      />
                    </div>
                    <div className="siEdit ms-auto">
                      <Icon type="edit" />
                    </div> */}

                  </div>
                  <div className="nodata">
                    No details available
                  </div>
                </div>
              </div>
            </div>
            <div className="rightAside border-start">
              <div className="cardSection">
                <div className="cardTitle">
                  <span>Social Connects</span>
                </div>
                <div className="cardContent">
                  <div className=" mb-1">Channels</div>
                  {/* <div className="mb-3 socialOnChannels customRadio">
                    <Radio.Group
                      onChange={onChannelsChange}
                      value={channelsValue}
                    >
                      <Radio value={1}>
                        <Image preview={false} src={YoutubeIcon} />
                        <span className="channelName">maddygoround</span>
                      </Radio>
                      <Radio value={2}>
                        <Image preview={false} src={TwitchIcon} />
                        <span className="channelName">maddygoround</span>
                      </Radio>
                    </Radio.Group>
                  </div> */}
                  <div className="nodata mb-3">
                    No channels available
                  </div>
                  <div className=" mb-2">Options</div>
                  <ul className="list-unstyled shareSocialOnChannels">
                    <li>
                      <div className="socialBtn">
                        <Image preview={false} src={Twitter} />
                      </div>
                    </li>
                    <li>
                      <div className="socialBtn">
                        <Image preview={false} src={Youtube} />
                      </div>
                    </li>
                    <li>
                      <div className="socialBtn">
                        <Image preview={false} src={Twitch} />
                      </div>
                    </li>
                    <li>
                      <div className="socialBtn">
                        <Image preview={false} src={facebook} />
                      </div>
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
                    selectedDevice={state.selectedDevice}
                    devices={state.devices}
                    onLoadUnloadDevice={onLoadUnloadDevice}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="playerAction">
        <div className="d-flex mx-auto">
          {/* <Button
            type="primary"
            onClick={onStartStream}
            disabled={
              state.selectedDevice && !state.streamEnabled ? false : true
            }
            className="me-2"
          >
            Start
          </Button>
          <Button
          type="ghost"
            onClick={onStopStream}
            disabled={
              state.selectedDevice && state.streamEnabled ? false : true
            }
          >
            Stop
          </Button> */}
          {!state.streamEnabled &&
            <Button size="large" type="primary" className="me-2" onClick={onStartStream}>
              Go Live
            </Button>
          }
          {state.streamEnabled &&
            <Button size="large" type="primary" className="me-2" danger onClick={onStopStream}>
              End Stream
            </Button>
          }
          {/* <Button size="large" type="default" className="record-btn">
            Record
          </Button> */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
