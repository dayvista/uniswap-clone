import React from "react";

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
        <img src="/status-dot.svg" draggable={false} />
      </div>
    </div>
  );
};

export default BlockNumber;
