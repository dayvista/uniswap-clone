import React from "react";

import circle from "../../assets/images/circle.svg";
import downArrow from "../../assets/images/down-arrow.svg";

const DownArrowIcon = () => {
  return (
    <button
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "29px",
        height: "29px",
        transform: "translate(-50%,-50%)",
        cursor: "pointer",
        border: "none",
        padding: "0",
        background: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
      >
        <img
          src={circle}
          draggable={false}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={downArrow} draggable={false} />
        </div>
      </div>
    </button>
  );
};

export default DownArrowIcon;
