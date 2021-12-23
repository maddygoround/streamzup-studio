import React from "react";
import { Select, Radio } from "antd";
const { Option } = Select;
const QualityController = ({ isDeviceSelected, onQualitySelect }) => {
  const [channelsValue, setChannelsValue] = React.useState(1);
  const onChannelsChange = (e) => {
    console.log("radio checked", e.target.value);
    setChannelsValue(e.target.value);
  };
  return (
    <div className="cardSection">
      <div className="cardTitle">
        <span>Option</span>
      </div>
      <div className="cardContent">
        <div className="cardContentSubTitle mb-1">Stream Quality</div>
        <div className="streamQulaitySelect mb-3">
          <Select
            onSelect={onQualitySelect}
            placeholder="Stream Qulaity"
            defaultValue={750000}
            className="w-100"
            size="large"
          >
            <Option value={2500000}>Ultra max</Option>
            <Option value={1200000}>Max</Option>
            <Option value={750000}>Balanced</Option>
            <Option value={450000}>Performance</Option>
          </Select>
        </div>
        <div className="cardContentSubTitle mb-1">Frame Per Seconds</div>
        <div className="framePerSeconds mb-3">
          <Radio.Group
            onChange={onChannelsChange}
            value={channelsValue}
            className="w-100 row d-flex"
          >
            <div className="col-6">
              <Radio value={1}>
                <span className="channelName">30</span>
              </Radio>
            </div>
            <div className="col-6">
              <Radio value={2}>
                <span className="channelName">60</span>
              </Radio>
            </div>
          </Radio.Group>
        </div>

        {/* {isDeviceSelected && (
          <Select
            onSelect={onQualitySelect}
            placeholder="Stream Qulaity"
            defaultValue={750000}
          >
            <Option value={2500000}>Ultra max</Option>
            <Option value={1200000}>Max</Option>
            <Option value={750000}>Balanced</Option>
            <Option value={450000}>Performance</Option>
          </Select>
        )} */}
      </div>
    </div>
  );
};

export default QualityController;
