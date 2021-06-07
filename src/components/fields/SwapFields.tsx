import React, { useState, useEffect } from "react";
import {
  removeDuplicateObjectFromArray,
  getErc20Balance,
} from "../../lib/utils";
import { Token } from "../../lib/types";
import { HiChevronDown } from "react-icons/hi";
import DownArrowIcon from "../buttons/SwapTokens";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../lib/redux/hooks";
import {
  modifyFromValue,
  modifyToValue,
} from "../../lib/redux/slices/inputValues";
import {
  modifyFromToken,
  modifyToToken,
} from "../../lib/redux/slices/swapTokens";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

type FieldProps = {
  heading: string;
  token: Token;
  changeToken: ActionCreatorWithPayload<any, string>;
  inputValue: string;
  changeInputValue: ActionCreatorWithPayload<any, string>;
  balance?: { quantity: number; symbol: string };
};
const Field = ({
  heading,
  balance,
  token,
  changeToken,
  inputValue,
  changeInputValue,
}: FieldProps) => {
  const dispatch = useDispatch();

  const { account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (heading.toLowerCase() === "from") {
      if (token?.address && account) {
        (async () => {
          // TODO: need to figure out why this is returning an error
          const tokenBalance = await getErc20Balance(token.address, account);

          console.log(tokenBalance);
        })();
      }
    }
  }, [token, account]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: heading.toLowerCase() === "from" ? "3px" : 0,
        background: "#e6f7ff",
        border: "3px solid #91d5ff",
        borderRadius: "10px",
        padding: "5px 32px 6px 19px",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        {heading}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "6px 0px 9px 0px",
        }}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: token ? "8px 16px" : "8px 16px 8px 5px",
            background: "#E6F7FF",
            boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            minHeight: "40px",
            minWidth: "114px",
          }}
        >
          {token ? (
            <img
              style={{ width: "19px", height: "19px", userSelect: "none" }}
              src={token.logoURI}
              alt={`${token.symbol} logo`}
            />
          ) : null}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "23px",
              textAlign: "center",
              margin: "0px 8px",
              fontFamily: "IBM Plex Mono, monospace",
              userSelect: "none",
            }}
          >
            {token ? token.symbol : "Select Token"}
          </p>
          <HiChevronDown
            style={{
              fontSize: "15px",
              color: "rgba(0, 0, 0, 0.85)",
              userSelect: "none",
            }}
          />
        </button>
        <input
          style={{
            color: "rgb(0, 0, 0)",
            width: "0px",
            position: "relative",
            fontWeight: 500,
            outline: "none",
            border: "none",
            flex: "1 1 auto",
            backgroundColor: "transparent",
            fontSize: "24px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0px",
            appearance: "textfield",
            textAlign: "right",
            marginLeft: "12px",
            fontFamily: "IBM Plex Mono, monospace",
          }}
          type="number"
          inputMode="decimal"
          placeholder="0.0"
          spellCheck={false}
          minLength={1}
          maxLength={79}
          value={inputValue ? inputValue : ""}
          onChange={(e) => {
            const { target } = e;
            const { value } = target;

            dispatch(changeInputValue(value));
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "rgb(0, 0, 0)",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {balance ? (
            <p
              style={{
                fontSize: "14px",
                lineHeight: "24px",
                textAlign: "left",
                color: "rgba(0, 0, 0, 0.85)",
              }}
            >
              <span style={{ userSelect: "none" }}>Balance:</span>
              {balance.quantity} {balance.symbol}
            </p>
          ) : (
            <div style={{ height: "24px" }} />
          )}
        </div>
      </div>
    </div>
  );
};

const SwapFields = () => {
  const [tokenList, setTokenList] = useState<Token[]>([]);

  useEffect(() => {
    const tokenSymbols = ["WETH", "AAVE", "UNI", "COMP", "DAI", "USDC"];

    (async () => {
      // TODO: fetch tokens with kovan testnet addresses (or just hard code it?)
      const res = await fetch(
        "https://gateway.ipfs.io/ipns/tokens.uniswap.org"
      );
      const json: { tokens: Token[] } = await res.json();
      const { tokens } = json;

      const filteredTokenList = removeDuplicateObjectFromArray(
        tokens.filter((token) => tokenSymbols.includes(token.symbol)),
        "symbol"
      );

      setTokenList(filteredTokenList);
    })();
  }, []);

  const fromToken = useSelector((state) => state.swapTokens.fromToken);
  const toToken = useSelector((state) => state.swapTokens.toToken);
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);

  const dispatch = useDispatch();

  useEffect(() => {
    // if (fromToken == null && tokenList.length > 0) {
    //   dispatch(modifyFromToken(tokenList[0]));
    // }

    if (tokenList.length > 0) {
      if (fromToken == null) {
        dispatch(modifyFromToken(tokenList[0]));
      }

      if (toToken == null) {
        dispatch(modifyToToken(tokenList[1]));
      }
    }
  }, [tokenList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Field
        heading="FROM"
        token={fromToken}
        changeToken={modifyFromToken}
        inputValue={fromValue}
        changeInputValue={modifyFromValue}
        balance={{ quantity: 32, symbol: "ETH" }}
      />
      <Field
        heading="TO"
        token={toToken}
        changeToken={modifyToToken}
        inputValue={toValue}
        changeInputValue={modifyToValue}
      />
      <DownArrowIcon />
    </div>
  );
};

export default SwapFields;
