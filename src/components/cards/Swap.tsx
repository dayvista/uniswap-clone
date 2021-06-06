import React from "react";
import SwapFields from "../fields/SwapFields";

const Swap = () => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "15px 15px 13px 15px",
        width: "465px",
        marginTop: "calc(108px - 1.5rem)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <p
        style={{
          marginRight: "auto",
          fontSize: "20px",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        Swap
      </p>
      <SwapFields />
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background: "#69c0ff",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          borderRadius: "10px",
          border: "none",
          fontFamily: "IBM Plex Mono, monospace",
          lineHeight: "24px",
          fontSize: "16px",
          color: "white",
          marginTop: "16px",
          padding: "13.5px 0px",
          // TODO: check the state of the inputs to see if an amount has been entered,
          //       and change the cursor state accordingly
          cursor: true ? "pointer" : "default",
        }}
      >
        <span style={{ userSelect: "none" }}>ENTER AN AMOUNT</span>
      </button>
    </div>
  );
};

export default Swap;
