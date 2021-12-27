// import Link from 'next/link';
// import Image from 'next/image';
import { Image } from "antd";
import React,{useContext} from "react";
import logo from "../../public/images/logo.svg";
import { ClientContext } from "../../utils/ClientContext";
require("./Header.less");

export const Header = () => {
  const { playback } = useContext(ClientContext);
  const [state, ] = playback;
  return (
    <header className="header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="header-left mainLogo">
          <Image src={logo} preview={false} className="headerLogo" />
        </div>
        <div className="header-right d-flex flex-row  justify-content-end align-items-center">
        <div className="header-right mainLogo">
          <Image src={state.qrcode} preview={true} className="headerLogo" />
        </div>
          Version 0.0.1
        </div>
      </div>
    </header>
  );
};
