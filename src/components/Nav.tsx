import React from "react";
import RouteSwitch from "../components/buttons/RouteSwitch";
import Wallet from "./buttons/Wallet";
import logo from "../assets/images/logo.svg";

const Nav = () => {
  return (
    <div id="nav">
      <img src={logo} draggable={false} alt="Cloudswap Logo" />
      <RouteSwitch />
      <Wallet />
    </div>
  );
};

export default Nav;
