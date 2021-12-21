import React from 'react';
import { Button,Divider } from 'antd';
const WebcamController = ({ state, onStartWebCam , onSetPosition,onStopWebCam }) => {

    return (
        <>
            <Button type="primary" onClick={onStartWebCam} shape="round" disabled={state.selectedDevice ? false : true} >
                Start Camera
            </Button>

            <Button type="primary" onClick={onStopWebCam} shape="round" disabled={state.selectedDevice ? false : true} >
                Stop Camera
            </Button>
            <Divider />
            <Button type="primary" onClick={()=>onSetPosition("left-bottom")} shape="round" disabled={state.selectedDevice ? false : true} >
                Left Bottom
            </Button>

            <Divider />
            <Button type="primary" onClick={()=>onSetPosition("left-top")} shape="round" disabled={state.selectedDevice ? false : true} >
                Left Top
            </Button>

            <Divider />
            <Button type="primary" onClick={()=>onSetPosition("right-top")} shape="round" disabled={state.selectedDevice ? false : true} >
                Right Top
            </Button>

            <Divider />
            <Button type="primary" onClick={()=>onSetPosition("right-bottom")} shape="round" disabled={state.selectedDevice ? false : true} >
                Right Bottom
            </Button>

        </>
    )
}

export default WebcamController;