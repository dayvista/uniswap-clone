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

import "../../styles/buttons/Wallet.css";

// uses Kovan testnet (chainId 42)
const injectedConnector = new InjectedConnector({ supportedChainIds: [42] });

const Wallet = () => {
  const { account, activate, active, library } = useWeb3React<Web3Provider>();

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

  return (
    <>
      {!active ? (
        <button onClick={onClick} id="connect-wallet-button">
          Connect Wallet
        </button>
      ) : (
        <div id="wallet-container">
          <div>
            <p>
              {account.substr(0, 4) +
                "..." +
                account.substr(account.length - 6)}
            </p>
            <img src={avatar} alt="user avatar" />
            <div
              style={{
                height: !balance ? "24px" : "auto",
              }}
            >
              {balance ? <p>{parseFloat(balance).toFixed(1)} ETH</p> : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
