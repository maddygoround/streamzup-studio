import React from 'react';
import { Button } from 'antd';
const WebcamController = ({state, onStartWebCam}) => {

    return (
        <Button type="primary" onClick={onStartWebCam} shape="round" disabled={state.selectedDevice  ? false : true} >
            Start Camera
        </Button>
    )
}

export default WebcamController;