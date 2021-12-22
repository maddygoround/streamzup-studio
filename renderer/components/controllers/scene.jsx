import { Menu } from "antd";
import React from "react";
const ScenceSelector = ({ isDeviceSelected, onScenceSelect }) => {
  return (
    <>
      <Menu selectedKeys={["main"]} mode="vertical">
        <Menu.Item key="main">Main</Menu.Item>
        <Menu.Item key="starting">Starting soon</Menu.Item>
        <Menu.Item key="break">Be right back</Menu.Item>
        <Menu.Item key="ending">Ending stream</Menu.Item>
        <Menu.Item key="overlay">Overlay</Menu.Item>
      </Menu>

      {/* <Select
        disabled={isDeviceSelected ? false : true}
        onSelect={onScenceSelect}
        placeholder="Select scence"
        defaultValue="main"
      >
        <Option value="main">Main</Option>
        <Option value="starting">Starting soon</Option>
        <Option value="break">Be right back</Option>
        <Option value="ending">Ending stream</Option>
        <Option value="overlay">Overlay</Option>
      </Select> */}
    </>
  );
};

export default ScenceSelector;
