import React, { useRef } from "react";
const Player = ({  canvasRef }) => {
  const canvasContainerRef = useRef(null);
  return (
    <div className="canvasPlayerContainer" ref={canvasContainerRef}>
      <canvas
        ref={canvasRef}
        width={canvasContainerRef.current?.offsetWidth}
        height={canvasContainerRef.current?.offsetHeight}
        className="canvasPlayer"
      />
    
    </div>
  );
};

export default Player;
