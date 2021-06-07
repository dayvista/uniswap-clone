import React, { useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { formatEther } from "@ethersproject/units";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../lib/redux/hooks";
import { setBalance } from "../../lib/redux/slices/walletData";

import avatar from "../../assets/images/avatar.svg";

// uses Kovan testnet (chainId 42)
const injectedConnector = new InjectedConnector({ supportedChainIds: [42] });

const Wallet = () => {
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>();

  const balance = useSelector((state) => state.walletData.balance);

  const dispatch = useDispatch();

  const onClick = () => {
    activate(injectedConnector);
  };

  useEffect(() => {
    if (library) {
      (async () => {
        const newBalance = formatEther(
          await library.getBalance(account, "latest")
        );

        if (newBalance !== balance) {
          dispatch(setBalance(newBalance));
        }
      })();
    } else {
      dispatch(setBalance(null));
    }
  }, [library]);

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  return (
    <>
      {!active ? (
        <button
          style={{
            fontWeight: 500,
            background: "#e6f7ff",
            padding: "10px 36px",
            cursor: "pointer",
            border: "none",
            borderRadius: "10px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "16px",
            justifySelf: "flex-end",
            width: "207px",
            height: "fit-content",
          }}
          onClick={onClick}
        >
          Connect Wallet
        </button>
      ) : (
        <div
          style={{
            width: "314px",
            height: "40px",
            justifySelf: "flex-end",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              zIndex: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "fit-content",
              height: "100%",
              padding: "0px 6.5px 0px 34.5px",
              background: "#E6F7FF",
              boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.016)",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: "bold",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {account.substr(0, 4) +
                "..." +
                account.substr(account.length - 6)}
            </p>
            <img
              src={avatar}
              alt="user avatar"
              style={{
                borderRadius: "100%",
                marginLeft: "6.5px",
                marginBottom: "2px",
                width: "19px",
                height: "19px",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "calc(100% - 18px)",
                zIndex: -1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 37px 4px 20px",
                border: "4px solid #E6F7FF",
                borderRadius: "10px",
                width: "60px",
                height: !balance ? "24px" : "auto",
              }}
            >
              {balance ? (
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "rgba(0, 0, 0, 0.85)",
                  }}
                >
                  {parseInt(balance)} ETH
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
