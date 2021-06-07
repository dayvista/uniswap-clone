import React from "react";

import statusDot from "../../assets/images/status-dot.svg";

import "../../styles/text/BlockNumber.css";

const BlockNumber = () => {
  return (
    <div id="block-number-container">
      <p style={{ marginRight: "8px" }}>Block Number</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={statusDot} draggable={false} />
      </div>
    </div>
  );
};

export default BlockNumber;
