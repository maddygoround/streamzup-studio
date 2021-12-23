import React from "react";
import { Image,Radio } from "antd";
const Overlays = ({ overlays, onSelectOverlay }) => {
  return (
    <div className="selectGraphic">
      <Radio.Group onChange={onSelectOverlay} >
        {overlays.map((overlay, index) => {
          return (
            <Radio value={overlay} key={index} className="">
              <Image src={overlay.url} preview={false} />
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default Overlays;
