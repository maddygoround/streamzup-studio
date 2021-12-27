import { Menu } from "antd";
import React from "react";
const ScenceSelector = ({  onScenceSelect ,value }) => {
  return (
    <>
      <Menu  defaultValue="main" mode="vertical" onSelect={onScenceSelect} value={value}  selectedKeys={[value]}>
        <Menu.Item key="main">Main</Menu.Item>
        <Menu.Item key="starting">Starting soon</Menu.Item>
        <Menu.Item key="break">Be right back</Menu.Item>
        <Menu.Item key="ending">Ending stream</Menu.Item>
        <Menu.Item key="overlay">Overlay</Menu.Item>
      </Menu>
    </>
  );
};

export default ScenceSelector;
