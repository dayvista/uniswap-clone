import React from "react";
import SwapFields from "../fields/SwapFields";
import { useAppSelector as useSelector } from "../../lib/redux/hooks";

const Swap = () => {
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);
  const fromToken = useSelector((state) => state.swapTokens.fromToken);
  const toToken = useSelector((state) => state.swapTokens.toToken);

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
          // TODO: check the state of the inputs to see if an amount has been entered,
          //       and change the background accordingly
          background: true ? "#69c0ff" : "#1890FF",
          boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
          borderRadius: "10px",
          border: "none",
          fontFamily: "IBM Plex Mono, monospace",
          lineHeight: "24px",
          fontSize: "16px",
          color: "white",
          // marginTop: "16px",
          padding: "13.5px 0px",
          // TODO: check the state of the inputs to see if an amount has been entered,
          //       and change the cursor state accordingly
          cursor: true ? "default" : "pointer",
        }}
      >
        {/* TODO: change what is said here depending on whether inputs are filled out and tokens are selected */}
        <span style={{ userSelect: "none" }}>ENTER AN AMOUNT</span>
      </button>
    </div>
  );
};

export default Swap;
