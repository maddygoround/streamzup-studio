import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
const ScenceSelector = ({ isDeviceSelected, onScenceSelect }) => {


    return (

        <Select
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
        </Select>



    )
}

export default ScenceSelector;