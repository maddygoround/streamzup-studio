import React from 'react';
import { List } from 'antd';
import Icon from './icon';
const Devices = ({ devices , onLoadDevice}) => {
    return (
        <>
         {/* <List
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
         /> */}
         <ul className="list-unstyled">
             <li className='d-flex w-100 mb-3'>
                 <div className="d-flex flex-column">
                     <strong>Mobile-1</strong>
                     {/* <span className="text-muted">Connected</span> */}
                 </div>
                 <div className="d-flex ms-auto text-success">
                     <Icon type="link" className="me-1"/>
                     <span>Connected</span>
                 </div>
             </li>
             <li className='d-flex w-100 mb-3'>
                 <div className="d-flex flex-column">
                     <strong>Mobile-1</strong>
                     <span className="text-muted">Connected</span>
                 </div>
                 <div className="d-flex ms-auto text-danger">
                     <Icon type="unlink" className="me-1"/>
                     <span>disconnected</span>
                 </div>
             </li>
             <li className='d-flex w-100 mb-3'>
                 <div className="d-flex flex-column">
                     <strong>Mobile-1</strong>
                     {/* <span className="text-muted">Connected</span> */}
                 </div>
                 <div className="d-flex ms-auto text-success">
                     <Icon type="link" className="me-1"/>
                     <span>Connected</span>
                 </div>
             </li>
         </ul>
        </>
    )
}

export default Devices;