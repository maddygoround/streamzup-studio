
import { Avatar, Image } from "antd";
import React, { ComponentType } from "react";
require("./steamInfo.less");

export const SteamInfo = ({ src, title, details, username, className }) => {
  return (
    <div className="d-flex align-items-center profileSec">
      <div className="position-relative">
        <div className={`custAvatar`}>
          {src && <Avatar src={<Image preview={false} src={src} />} />}
        </div>
      </div>
      <div className="profileDetail">
        {title && <strong className="title">{title}</strong>}
        {details && <div className="details ">{details}</div>}
        {username && <div className=" username">{username}</div>}
      </div>
    </div>
  );
};
