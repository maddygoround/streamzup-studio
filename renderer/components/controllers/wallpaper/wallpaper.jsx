import { Image, Radio } from "antd";
import React from "react";

require("./wallpaper.less");
const Wallpapers = ({ wallpapers, onSelectWallpaper }) => {

  return (
    <div className="selectGraphic">
      <Radio.Group onChange={onSelectWallpaper} >
        {wallpapers.map((wallpaper,index) => {
          return (
            <Radio value={wallpaper} className="" key={index}>
                <Image
                  src={wallpaper.url}
                  preview={false}
                />

            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default Wallpapers;
