import { abi } from "../lib/abi/ierc20";
import Web3 from "web3";
const rpcURL = `https://kovan.infura.io/v3/${process.env.RAZZLE_INFURA_PROJECT_ID}`;
const web3 = new Web3(rpcURL);

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
  const contract = new web3.eth.Contract(abi, tokenAddress);

  const balance = await contract.methods.balanceOf(walletAddress).call();

  return balance;
};
