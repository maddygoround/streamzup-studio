import React, { useContext } from 'react';
import { Select } from 'antd';
import { ClientContext } from '../../utils/ClientContext';
const { Option } = Select;
const QualityController = ({isDeviceSelected, onQualitySelect}) => {


    return (
        <>
            {isDeviceSelected &&
                <Select
                    onSelect={onQualitySelect}
                    placeholder="Select a person"
                    defaultValue={750000}
                >
                    <Option value={2500000}>Ultra max</Option>
                    <Option value={1200000}>Max</Option>
                    <Option value={750000}>Balanced</Option>
                    <Option value={450000}>Performance</Option>
                </Select>
                
            }
        </>
    )
}

export default QualityController;