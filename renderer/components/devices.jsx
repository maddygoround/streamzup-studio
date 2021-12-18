import React from 'react';
import { List } from 'antd';
const Devices = ({ devices , onLoadDevice}) => {
    return (
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={devices}
            renderItem={device => (
                <List.Item
                    actions={[<a onClick={() => onLoadDevice(device.id)} key="list-loadmore-edit">select</a>]}
                >
                    {device.name}
                </List.Item>
            )}
        />
    )
}

export default Devices;