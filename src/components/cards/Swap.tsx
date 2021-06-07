import React from "react";
import SwapFields from "../fields/SwapFields";
import { useAppSelector as useSelector } from "../../lib/redux/hooks";

import "../../styles/cards/Swap.css";

const Swap = () => {
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);
  const toToken = useSelector((state) => state.swapTokens.toToken);

  return (
    <div className="card" id="swap-card">
      <p>Swap</p>
      <SwapFields />
      <div className="swap-ratio-container">
        {/* TODO: put swap ratio here when the time comes */}
        {false ? <p>1 USDC = 0.034 ETH</p> : null}
      </div>
      <button
        style={{
          background:
            !fromValue || !toValue || !toToken ? "#69c0ff" : "#1890FF",
          cursor: !fromValue || !toValue || !toToken ? "default" : "pointer",
        }}
        disabled={!fromValue || !toValue || !toToken}
      >
        <span className="no-select">
          {!fromValue || !toValue
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
