import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div id="nav">
      <img src="/logo.svg" draggable={false} />
      <Link to="/claim">Claim</Link>
      <Link to="/claim">Claim</Link>
    </div>
  );
};

export default Nav;
