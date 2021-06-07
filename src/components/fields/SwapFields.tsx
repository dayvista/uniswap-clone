import React, { useState, useEffect, ChangeEvent } from "react";
import {
  removeDuplicateObjectFromArray,
  getErc20Balance,
  getExchangeRate,
} from "../../lib/utils";
import { Token } from "../../lib/types";
import { HiChevronDown } from "react-icons/hi";
import TokenSwitch from "../buttons/TokenSwitch";
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
import { formatEther, parseEther } from "@ethersproject/units";
import debounce from "lodash.debounce";
import { tokens } from "../../lib/data/tokens";

import "../../styles/fields/SwapFields.css";

type FieldProps = {
  heading: string;
  token: Token;
  changeToken: ActionCreatorWithPayload<any, string>;
  inputValue: string;
  changeInputValue: ActionCreatorWithPayload<any, string>;
  balance: { quantity: string; symbol: string };
};
const Field = ({
  heading,
  balance,
  token,
  changeToken,
  inputValue,
  changeInputValue,
}: FieldProps) => {
  const fromToken = useSelector((state) => state.swapTokens.fromToken);
  const toToken = useSelector((state) => state.swapTokens.toToken);

  const dispatch = useDispatch();

  const { account, active } = useWeb3React<Web3Provider>();

  // Get the token balance
  useEffect(() => {
    if (token && token.address && !token.balance && account) {
      (async () => {
        const tokenBalance = await getErc20Balance(token.address, account);

        dispatch(changeToken({ ...token, balance: formatEther(tokenBalance) }));
      })();
    }
  }, [token, account]);

  // Make all token balances 'null' when the user is no longer logged into Metamask
  useEffect(() => {
    if (!active && token && token.balance) {
      dispatch(changeToken({ ...token, balance: null }));
    }
  }, [active]);

  // on input change, get the exchange rate between selected tokens
  const debounceOnChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    dispatch(changeInputValue(value));
  }, 1000);

  // useEffect(() => {
  //   const shouldCalcExchangeRate =
  //     heading.toLowerCase() === "from" &&
  //     inputValue &&
  //     active &&
  //     fromToken &&
  //     fromToken.address &&
  //     toToken &&
  //     toToken.address
  //       ? true
  //       : false;

  //   if (shouldCalcExchangeRate) {
  //     (async () => {
  //       const exchangeRate = await getExchangeRate(
  //         parseEther(inputValue),
  //         fromToken.address,
  //         toToken.address
  //       );

  //       console.log(exchangeRate);
  //     })();
  //   }
  // }, [inputValue]);

  return (
    <div
      className="field-container"
      style={{ marginBottom: heading.toLowerCase() === "from" ? "3px" : 0 }}
    >
      <p
        style={{
          fontSize: "14px",
        }}
        className="text bold no-select"
      >
        {heading}
      </p>
      <div className="token-button-container">
        <button
          style={{ padding: token ? "8px 16px" : "8px 16px 8px 5px" }}
          className="token-button"
        >
          {token ? (
            <img
              className="no-select"
              src={token.logoURI}
              alt={`${token.symbol} logo`}
            />
          ) : null}
          <p className="no-select bold">
            {token ? token.symbol : "Select Token"}
          </p>
          <HiChevronDown className="no-select" />
        </button>
        <input
          type="number"
          inputMode="decimal"
          placeholder="0.0"
          spellCheck={false}
          minLength={1}
          maxLength={79}
          onChange={debounceOnChange}
          disabled={heading.toLowerCase() === "to"}
          id={`${heading.toLowerCase()}-token-input`}
        />
      </div>
      <div className="balance-container">
        {balance ? (
          <p>
            <span className="no-select">Balance:</span>
            {balance.quantity === "0.0" || balance.quantity == "0"
              ? "0"
              : parseFloat(balance.quantity).toFixed(3)}{" "}
            {balance.symbol}
          </p>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

const SwapFields = () => {
  const [tokenList, setTokenList] = useState<Token[]>([]);

  // mock load the token list
  useEffect(() => {
    const desiredTokens = [
      { symbol: "WETH", address: "0xd0A1E359811322d97991E03f863a0C30C2cF029C" },
      { symbol: "AAVE", address: "0xB597cd8D3217ea6477232F9217fa70837ff667Af" },
      { symbol: "UNI", address: "0x075A36BA8846C6B6F53644fDd3bf17E5151789DC" },
      { symbol: "COMP", address: "0x61460874a7196d6a22D1eE4922473664b3E95270" },
      { symbol: "DAI", address: "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD" },
      { symbol: "USDC", address: "0xe22da380ee6B445bb8273C81944ADEB6E8450422" },
    ];

    const filteredTokenList = removeDuplicateObjectFromArray<Token>(
      tokens.filter((token) =>
        desiredTokens.some(
          (desiredToken) => desiredToken.symbol === token.symbol
        )
      ),
      "symbol"
    ).map((token) => {
      return {
        ...token,
        address: desiredTokens.find(
          (desiredToken) => desiredToken.symbol === token.symbol
        ).address,
      };
    });

    setTokenList(filteredTokenList);
  }, []);

  const fromToken = useSelector((state) => state.swapTokens.fromToken);
  const toToken = useSelector((state) => state.swapTokens.toToken);
  const fromValue = useSelector((state) => state.inputValues.fromVal);
  const toValue = useSelector((state) => state.inputValues.toVal);

  const dispatch = useDispatch();

  // Set the initial token values on page load
  useEffect(() => {
    // lines 259 - 261 = the desired function if the user was able to choose a token from a modal menu
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
      id="fields-container"
    >
      <Field
        heading="FROM"
        token={fromToken}
        changeToken={modifyFromToken}
        inputValue={fromValue}
        changeInputValue={modifyFromValue}
        balance={
          fromToken && fromToken?.balance
            ? { quantity: fromToken.balance, symbol: fromToken.symbol }
            : null
        }
      />
      <Field
        heading="TO"
        token={toToken}
        changeToken={modifyToToken}
        inputValue={toValue}
        changeInputValue={modifyToValue}
        balance={
          toToken && toToken?.balance
            ? { quantity: toToken.balance, symbol: toToken.symbol }
            : null
        }
      />
      <TokenSwitch />
    </div>
  );
};

export default SwapFields;
