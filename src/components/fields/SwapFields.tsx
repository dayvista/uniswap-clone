import React from "react";

const tokenList = [
  { img: "", ticker: "ETH" },
  { img: "", ticker: "USDC" },
];

type Token = {
  img: string;
  ticker: string;
};

type FieldProps = {
  heading: string;
  tokenList: Token[];
};
const Field = ({ heading, tokenList }: FieldProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{heading}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <select placeholder="Select token">
          {tokenList.map((token) => {
            const { img, ticker } = token;

            return (
              <option value={ticker} style={{ display: "flex" }}>
                {/* token image */}
                {/* ticker symbol */}
                {/* down arrow icon */}
              </option>
            );
          })}
        </select>
        <input />
      </div>
    </div>
  );
};

const SwapFields = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Field heading="FROM" tokenList={tokenList} />
      <Field heading="TO" tokenList={tokenList} />
    </div>
  );
};

export default SwapFields;
