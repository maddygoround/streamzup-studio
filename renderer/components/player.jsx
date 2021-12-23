import React, { useRef, useEffect } from "react";
import { Button } from "antd";
const Player = ({ onStopStream, onStartStream, state, canvasRef }) => {
  const canvasContainerRef = useRef(null);
  return (
    <div className="canvasPlayerContainer" ref={canvasContainerRef}>
      <canvas
        ref={canvasRef}
        width={canvasContainerRef.width}
        height={canvasContainerRef.height}
        className="canvasPlayer"
      />
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
          <Button size="large" type="primary" className="me-2" danger>Go Live</Button>
          <Button size="large" >Record</Button>
        </div>
      </div>
    </div>
  );
};

export default Player;
