import React from "react";
import SwapFields from "../fields/SwapFields";
import { useAppSelector as useSelector } from "../../lib/redux/hooks";

const Swap = () => {
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);
  const toToken = useSelector((state) => state.swapTokens.toToken);

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "15px 15px 13px 15px",
        width: "24.22vw",
        marginTop: "calc(108px - 1.5rem)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      id="swap-card"
    >
      <p
        style={{
          marginRight: "auto",
          fontSize: "20px",
          fontWeight: 500,
          userSelect: "none",
          paddingBottom: "23px",
        }}
      >
        Swap
      </p>
      <SwapFields />
      <div>
        <div
          style={{
            height: "39px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {false ? (
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                paddingRight: "30px",
              }}
            >
              1 USDC = 0.034 ETH
            </p>
          ) : null}
        </div>
      </div>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          background:
            !fromValue || !toValue || !toToken ? "#69c0ff" : "#1890FF",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          borderRadius: "10px",
          border: "none",
          fontFamily: "IBM Plex Mono, monospace",
          lineHeight: "24px",
          fontSize: "16px",
          color: "white",
          padding: "13.5px 0px",
          cursor: !fromValue || !toValue || !toToken ? "default" : "pointer",
        }}
      >
        <span style={{ userSelect: "none" }}>
          {!fromValue && !toValue
            ? "ENTER AN AMOUNT"
            : !toToken
            ? "SELECT A TOKEN"
            : "Swap"}
        </span>
      </button>
    </div>
  );
};

export default Swap;
