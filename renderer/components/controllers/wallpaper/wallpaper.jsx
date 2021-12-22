import { Image, Radio } from "antd";
import React from "react";

require("./wallpaper.less");
const Wallpapers = ({ wallpapers, onSelectWallpaper }) => {
  const [value, setValue] = React.useState(1);
  const onChangeGraphic = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="selectGraphic">
      <Radio.Group onChange={onChangeGraphic} value={value}>
        {wallpapers.map((wallpaper, index) => {
          return (
            <Radio value={wallpaper} className="">
                <Image
                  src={wallpaper.url}
                  preview={false}
                />
                {/* <Button
                    type="primary"
                    onClick={() => onSelectWallpaper(wallpaper)}
                    shape="round"
                  >
                    Select
                  </Button> */}
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default Wallpapers;
