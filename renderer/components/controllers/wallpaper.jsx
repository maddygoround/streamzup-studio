import React from 'react';
import { Image, Divider, Button } from 'antd';
const Wallpapers = ({ wallpapers, onSelectWallpaper }) => {
    
    return (
        <>
            {
                wallpapers.map((wallpaper,index) => {
                    return (<div key={index}>
                        <div>
                            <Image src={wallpaper.url} height={100} width={200} />
                            <Button type="primary" onClick={() => onSelectWallpaper(wallpaper)} shape="round" >
                                Select
                            </Button>
                        </div>

                    </div>
                    )
                })
            }
        </>

    )
}

export default Wallpapers;