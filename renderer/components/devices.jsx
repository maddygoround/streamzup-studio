import { Button } from "antd";
import React from "react";
const Devices = ({ devices, onLoadDevice, selectedDevice }) => {
  return (
    <>
    {devices.length ?
      <ul className="list-unstyled">
        {devices.map((device) => {
          return (
            <li className="d-flex align-items-center w-100 mb-3">
              <div className="d-flex flex-column">
                <strong>{device.name}</strong>
              </div>
              <div className="d-flex ms-auto text-success">
                <Button
                  type="primary"
                  onClick={() => onLoadDevice(device.id)}
                  danger={selectedDevice ? true : false}
                >
                  {selectedDevice ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </li>
          );
        })}
      </ul> :
           <div className="nodata">
           No devices found
         </div>}
    </>
  );
};

export default Devices;
