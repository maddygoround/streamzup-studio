import React, { useEffect, useContext, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Layout,
} from 'antd';
import { ClientContext } from "../utils/ClientContext";
import { fetch } from "../utils/fetch";
import Devices from '../components/devices';
import Player from '../components/player';
import Overlays from '../components/controllers/overlay';
import WebcamController from '../components/controllers/webcam';
import QualityController from '../components/controllers/quality';
import ScenceSelector from '../components/controllers/scene';
import Wallpapers from '../components/controllers/wallpaper';
const {
  Header,
  Content,
} = Layout;


function Home() {

  const { playback, overlay, peer } = useContext(ClientContext);
  const [state, setState] = playback;
  const [graphics, setGraphics] = overlay;
  const [peerManager,] = peer;
  const canvasRef = useRef(null);
  const onLoadDevice = (deviceId) => {
    setState(() => ({
      ...state,
      selectedDevice: deviceId
    }));
  }


  const onQualitySelect = (value) => {
    peerManager.changeQuality(value)
  }

  const onStartWebCam = () => {
    peerManager.startCamera();
  }

  const onStopWebCam = () => {
    peerManager.stopCamera();
  }

  const onSelectOverlay = (overlay) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedOverlay: overlay
      }));
    }
  }

  const onSetPosition= (position)=>{
    peerManager.setCameraPosition(position)
  }

  const onSelectWallpaper = (wallpaper) => {
    if (state.selectedDevice) {
      setGraphics(() => ({
        ...graphics,
        selectedWallpaper: wallpaper
      }));
    }
  }

  const onStartStream = () => {
    peerManager.startStream(canvasRef);
  }

  const onStopStream = () => {
    peerManager.stopStream();
  }

  const onScenceSelect = (scence) => {
    var src = "";
    switch (scence) {
      case "starting":
        src = "overlay.mp4"
        break;
      case "ending":
        src = "overlay3.mp4"
        break;
      case "break":
        src = "overlay2.mp4"
        break;
    }
    peerManager.selectScence(scence, src)
  }

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
  }, [state.selectedDevice])


  useEffect(() => {
    setInterval(() => {
      fetch();
    }, 3000)
  }, [])

  return (
    <React.Fragment>
      {/* <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

      <Header>
        <Link href="/next">
          <a>Go to next page</a>
        </Link>
      </Header> */}

      <Content style={{ padding: 48 }}>
        <ScenceSelector isDeviceSelected={state.selectedDevice ? true : false} onScenceSelect={onScenceSelect} />
        <QualityController isDeviceSelected={state.selectedDevice ? true : false} onQualitySelect={onQualitySelect} />
        <Overlays overlays={graphics.overlays} onSelectOverlay={onSelectOverlay} />
        <Wallpapers wallpapers={graphics.wallpapers} onSelectWallpaper={onSelectWallpaper}  />
        <WebcamController state={state} onStartWebCam={onStartWebCam} onStopWebCam={onStopWebCam} onSetPosition={onSetPosition}/>
        <Devices devices={state.devices} onLoadDevice={onLoadDevice} />
        <Player state={state} onStartStream={onStartStream} onStopStream={onStopStream} canvasRef={canvasRef} />
      </Content>
    </React.Fragment>
  );
};

export default Home;
