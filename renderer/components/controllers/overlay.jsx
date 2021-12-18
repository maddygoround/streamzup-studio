import React from 'react';
import { Image, Divider, Button } from 'antd';
const Overlays = ({ overlays, onSelectOverlay }) => {
    
    return (
        <>
            {
                overlays.map((overlay,index) => {
                    return (<div key={index}>
                        <div>
                            <Image src={overlay.url} height={100} width={200} />
                            <Button type="primary" onClick={() => onSelectOverlay(overlay)} shape="round" >
                                Select
                            </Button>
                        </div><Divider>{overlay.name}</Divider>

                    </div>
                    )
                })
            }
        </>

    )
}

export default Overlays;