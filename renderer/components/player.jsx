import React, { useRef, useEffect } from "react";
import { Button } from "antd";
const Player = ({ onStopStream, onStartStream, state, canvasRef }) => {
  return (
    <div className="canvasPlayerContainer">
      <canvas
        ref={canvasRef}
        // width={640}
        // height={360}
        className="canvasPlayer"
      />
      <div className="playerAction">
        <Button
          type="primary"
          onClick={onStartStream}
          shape="round"
          disabled={state.selectedDevice && !state.streamEnabled ? false : true}
        >
          Start
        </Button>
        <Button
          shape="round"
          onClick={onStopStream}
          disabled={state.selectedDevice && state.streamEnabled ? false : true}
        >
          Stop{" "}
        </Button>
      </div>
    </div>
  );
};

export default Player;
