import React, { useState, useEffect, KeyboardEvent } from "react";
import { removeDuplicateObjectFromArray } from "../../lib/utils";
import { Token } from "../../lib/types";
import { HiChevronDown } from "react-icons/hi";
import DownArrowIcon from "../icons/DownArrow";

type FieldProps = {
  heading: string;
  tokenList: Token[];
  balance?: { quantity: number; symbol: string };
};
const Field = ({ heading, tokenList, balance }: FieldProps) => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    if (
      token == null &&
      tokenList.length > 0 &&
      heading.toLowerCase() === "from"
    ) {
      setToken(tokenList[0]);
    }
  }, [tokenList]);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: "23px 0px",
      }}
    >
      <Field
        heading="FROM"
        tokenList={tokenList}
        balance={{ quantity: 32, symbol: "ETH" }}
      />
      <Field heading="TO" tokenList={tokenList} />
      <DownArrowIcon />
    </div>
  );
};

export default SwapFields;
