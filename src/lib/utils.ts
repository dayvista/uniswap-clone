import { abi as iErc20Abi } from "../lib/abi/ierc20";
import { abi as uniswapAbi } from "../lib/abi/uniswap";
import Web3 from "web3";
const rpcURL = `https://kovan.infura.io/v3/${process.env.RAZZLE_INFURA_PROJECT_ID}`;
const web3 = new Web3(rpcURL);
import { BigNumber } from "@ethersproject/bignumber";
import { FACTORY_ADDRESS, INIT_CODE_HASH } from "@uniswap/sdk";
import { pack, keccak256 } from "@ethersproject/solidity";
import { getCreate2Address } from "@ethersproject/address";

export const removeDuplicateObjectFromArray = <T>(
  arr: object[],
  key: string
): T[] => {
  const check = {};

  const filteredArr = [];

  arr.forEach((obj) => {
    if (!check[obj[key]]) {
      check[obj[key]] = true;

      filteredArr.push(obj);
    }
  });

  return filteredArr;
};

export const getErc20Balance = async (
  tokenAddress: string,
  walletAddress: string
) => {
  const contract = new web3.eth.Contract(iErc20Abi, tokenAddress);

  const balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;
};

export const getExchangeRate = async (
  exchangeAmount: BigNumber,
  fromContractAddress: string,
  toContractAddress: string
) => {
  const pairAddress = getCreate2Address(
    FACTORY_ADDRESS,
    keccak256(
      ["bytes"],
      [pack(["address", "address"], [fromContractAddress, toContractAddress])]
    ),
    INIT_CODE_HASH
  );

  const contract = new web3.eth.Contract(uniswapAbi, pairAddress);

  const exchangeRate = await contract.methods
    .getAmountsOut(web3.utils.hexToNumberString(exchangeAmount._hex), [
      fromContractAddress,
      toContractAddress,
    ])
    .call();

  return exchangeRate;
};
