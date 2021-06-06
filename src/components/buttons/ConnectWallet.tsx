import React from "react";

const ConnectWallet = () => {
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          fontWeight: 500,
          background: "#e6f7ff",
          padding: "8px 36px",
          cursor: "pointer",
          border: "none",
          borderRadius: "10px",
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: "16px",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
