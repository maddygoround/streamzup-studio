import { Image, Radio } from "antd";
import React from "react";

require("./gallery.less");
const Gallery = ({ gallery, onSelectGalleryItem, value, type }) => {

  return (
    <div className="selectGraphic">
      <Radio.Group onChange={onSelectGalleryItem} value={value} >
        {gallery.map((galleryItem, index) => {
          return (
            <Radio value={galleryItem} className="" key={index}>
              {type === 'img' &&
                <Image
                  src={galleryItem}
                  preview={false}
                />
              }
              {type === 'video' &&
                <video
                  className="video"
                  src={galleryItem}
                  autoPlay
                  loop
                  preload="true"
                  muted
                />
              }
            </Radio>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default Gallery;
