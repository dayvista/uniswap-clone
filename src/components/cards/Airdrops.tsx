import React from "react";

import "../../styles/cards/Airdrops.css";

const airdrops = [
  { quantity: 5543, symbol: "RAIN", claimed: false },
  { quantity: 5543, symbol: "THUNDER", claimed: true },
  { quantity: 567, symbol: "FROST", claimed: true },
  { quantity: 60, symbol: "SLEET", claimed: true },
  { quantity: 1000, symbol: "VAPOR", claimed: true },
];

const Airdrops = () => {
  return (
    <div className="card" id="airdrops-card">
      <p className="bold">Your Airdrops</p>
      {airdrops.map((airdrop) => {
        return (
          <div className="airdrop-container">
            <div className="airdrop-quantity-field">
              {airdrop.quantity} {airdrop.symbol}
            </div>
            <button
              className={`airdrop-claim-button ${
                airdrop.claimed ? "claimed" : ""
              }`}
            >
              <span className="no-select">
                {airdrop.claimed ? "CLAIMED" : "CLAIM"}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Airdrops;
