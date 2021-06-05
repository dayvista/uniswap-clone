import React from "react";
import "../../styles/buttons/RouteSwitch.css";
import { Link, useLocation } from "react-router-dom";

const RouteSwitch = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div id="switch-container">
      <Link
        to="/"
        className={`switch-button ${pathname === "/" ? "active" : ""}`}
        style={{ marginRight: "2px" }}
      >
        Swap
      </Link>
      <Link
        to="/claim"
        className={`switch-button ${pathname === "/claim" ? "active" : ""}`}
      >
        Claim
      </Link>
    </div>
  );
};

export default RouteSwitch;
