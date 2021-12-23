import React from "react";
import { Button, Divider, Checkbox, Radio } from "antd";
import Icon from "../../icon";

require("./webcam.less");
const WebcamController = ({
  state,
  onStartWebCam,
  onSetPosition,
  onStopWebCam,
}) => {
  const [value, setValue] = React.useState(1);
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const onChangePosition = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="cameraSetting">
      <div className="row ">
        <div className="col-lg-6">
          <Checkbox onChange={onChange} disabled={state.selectedDevice ? false : true}>
            <Icon type="01-webcam-on" />
            <Icon type="01-webcam-off" />
          </Checkbox>
        </div>
        <div className="col-lg-6">
          <Checkbox onChange={onChange} disabled={state.selectedDevice ? false : true}>
            <Icon type="01-webcam-off" />
          </Checkbox>
        </div>
      </div>

      <Divider />
      <div className="camPosition">
        <div className="camTitle mb-1">Position</div>
        <Radio.Group onChange={onChangePosition} value={value}>
          <Radio value={1} className="top-left"></Radio>
          <Radio value={2} className="top-right"></Radio>
          <Radio value={3} className="bottom-left"></Radio>
          <Radio value={4} className="bottom-right"></Radio>
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
