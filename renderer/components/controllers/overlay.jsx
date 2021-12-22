import React from "react";
import { Image, Divider, Button, Radio } from "antd";
const Overlays = ({ overlays, onSelectOverlay }) => {
  const [value, setValue] = React.useState(1);
  const onChangeGraphic = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="selectGraphic">
      <Radio.Group onChange={onChangeGraphic} value={value}>
        {overlays.map((overlay, index) => {
          return (
            <Radio value={overlay} key={index} className="">
              <Image src={overlay.url} preview={false} />
              {/* <Button type="primary" onClick={() => onSelectOverlay(overlay)} shape="round" >
                                Select
                            </Button> */}
              {/* <Divider>{overlay.name}</Divider> */}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default Overlays;
