import React from "react";
import statusDot from "../../assets/images/status-dot.svg";

const BlockNumber = () => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        right: "32px",
        bottom: "24px",
        color: "#52C41A",
        fontSize: "14px",
        userSelect: "none",
      }}
    >
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
