import React from "react";
import RouteSwitch from "../components/buttons/RouteSwitch";
import ConnectWallet from "../components/buttons/ConnectWallet";
import logo from "../assets/images/logo.svg";

const Nav = () => {
  return (
    <div id="nav">
      <img src={logo} draggable={false} alt="Cloudswap Logo" />
      <RouteSwitch />
      <ConnectWallet />
    </div>
  );
};

export default Nav;
