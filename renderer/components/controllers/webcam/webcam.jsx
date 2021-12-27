import React from "react";
import { Button, Divider, Checkbox, Radio } from "antd";
import Icon from "../../icon";

require("./webcam.less");
const WebcamController = ({
  isDeviceSelected,
  onWebCamStatusChange,
  onSetPosition,
  value,
  posValue
}) => {

  return (
    <div className="cameraSetting">
      <div className="row mb-3">
        <div className="col-lg-6">
          <Checkbox onChange={onWebCamStatusChange} disabled={isDeviceSelected ? false : true} checked={value} defaultChecked={false}>
            <Icon type="01-webcam-on" />
            <Icon type="01-webcam-off" />
          </Checkbox>
        </div>
        {/* <div className="col-lg-6">
          <Checkbox onChange={onStopWebCam} disabled={isDeviceSelected ? false : true}>
            <Icon type="image" />
          </Checkbox>
        </div> */}
      </div>

      <div className="camPosition">
        <div className="camTitle mb-1">Position</div>
        <Radio.Group onChange={onSetPosition}  defaultValue="bottom-left" value={posValue}>
          <Radio value="top-left" className="top-left"></Radio>
          <Radio value="top-right" className="top-right"></Radio>
          <Radio value="bottom-left" className="bottom-left"></Radio>
          <Radio value="bottom-right" className="bottom-right"></Radio>
        </Radio.Group>
      </div>
      {/* <Button
        type="primary"
        onClick={() => onSetPosition("left-bottom")}
        disabled={state.selectedDevice ? false : true}
      >
        Left Bottom
      </Button>

      <Divider />
      <Button
        type="primary"
        onClick={() => onSetPosition("left-top")}
        disabled={state.selectedDevice ? false : true}
      >
        Left Top
      </Button>

      <Divider />
      <Button
        type="primary"
        onClick={() => onSetPosition("right-top")}
        disabled={state.selectedDevice ? false : true}
      >
        Right Top
      </Button>

      <Divider />
      <Button
        type="primary"
        onClick={() => onSetPosition("right-bottom")}
        disabled={state.selectedDevice ? false : true}
      >
        Right Bottom
      </Button> */}
    </div>
  );
};

export default WebcamController;
