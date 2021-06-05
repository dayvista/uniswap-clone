import React from "react";
import { Link } from "react-router-dom";
import RouteSwitch from "../components/buttons/RouteSwitch";
import ConnectWallet from "../components/buttons/ConnectWallet";

const Nav = () => {
  return (
    <div id="nav">
      <img src="/logo.svg" draggable={false} alt="Cloudswap Logo" />
      <RouteSwitch />
      <ConnectWallet />
    </div>
  );
};

export default Nav;
