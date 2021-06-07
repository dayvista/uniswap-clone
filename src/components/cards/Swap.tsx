import React from "react";
import SwapFields from "../fields/SwapFields";
import { useAppSelector as useSelector } from "../../lib/redux/hooks";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import "../../styles/cards/Swap.css";

const injectedConnector = new InjectedConnector({ supportedChainIds: [42] });

const Swap = () => {
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);
  const toToken = useSelector((state) => state.swapTokens.toToken);

  const { active, activate } = useWeb3React<Web3Provider>();

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
          background: !active
            ? "#1890FF"
            : !fromValue || !toValue || !toToken
            ? "#69c0ff"
            : "#1890FF",
          cursor: !active
            ? "pointer"
            : !fromValue || !toValue || !toToken
            ? "default"
            : "pointer",
        }}
        disabled={!active ? false : !fromValue || !toValue || !toToken}
        onClick={() => !active && activate(injectedConnector)}
      >
        <span className="no-select">
          {!active
            ? "CONNECT WALLET"
            : !fromValue || !toValue
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
