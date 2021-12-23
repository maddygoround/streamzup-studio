import React from 'react';
const Devices = ({ devices, onLoadDevice }) => {
    return (
        <>
            <ul className="list-unstyled">
                {
                    devices.map((device) => {
                        return (
                            <li className='d-flex w-100 mb-3'>
                                <div className="d-flex flex-column">
                                    <strong>{device.name}</strong>
                                </div>
                                <div className="d-flex ms-auto text-success">
                                    <span onClick={() => onLoadDevice(device.id)}>Connect</span>
                                </div>
                            </li>)
                    })
                }
            </ul>
        </>
    )
}

export default Devices;