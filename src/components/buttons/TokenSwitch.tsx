import React from "react";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../lib/redux/hooks";
import { switchTokens } from "../../lib/redux/slices/swapTokens";

import circle from "../../assets/images/circle.svg";
import downArrow from "../../assets/images/down-arrow.svg";

import "../../styles/buttons/TokenSwitch.css";

const TokenSwitch = () => {
  const fromToken = useSelector((state) => state.swapTokens.fromToken);
  const toToken = useSelector((state) => state.swapTokens.toToken);

  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        if (fromToken.symbol !== toToken.symbol) {
          dispatch(switchTokens());
        }
      }}
      id="token-switch"
    >
      <div className="no-select">
        <img src={circle} draggable={false} />
        <div>
          <img src={downArrow} draggable={false} />
        </div>
      </div>
    </button>
  );
};

export default TokenSwitch;
