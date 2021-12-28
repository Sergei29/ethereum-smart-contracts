import { ethers } from "ethers";

type AccountsType = string[] | [] | undefined;
const STR_CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ARR_CONTRACT_INTERFACE = [
  "function hello() public pure returns (string memory)",
];

/**
 * @description get instance of ethereum MetaMask
 * @returns {Object} MetaMask object
 */
export const getEth = (): Record<string, any> => {
  const eth = (window as Record<string, any>).ethereum;
  if (!eth) {
    throw new Error(
      "Get MetaMask extension and set your account. at: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
    );
  }

  return eth;
};

/**
 * @description does it have any accounts
 * @returns {Promise<Boolean>} resolving to boolean whether it has or not
 */
export const hasAccounts = async () => {
  const eth = getEth();
  const accounts: AccountsType = await eth.request({
    method: "eth_accounts",
  });

  return !!accounts && !!accounts.length;
};

/**
 * @description does it have any request accounts
 * @returns {Promise<Boolean>} resolving to boolean whether it has or not
 */
export const hasRequestAccounts = async () => {
  const eth = getEth();
  const accounts: AccountsType = await eth.request({
    method: "eth_requestAccounts",
  });

  return !!accounts && !!accounts.length;
};

/**
 * @description run the contract
 * @returns {Promise<undefined>} spins up the contract via the Metamask API
 */
export const run = async () => {
  const bHasAccounts = await hasAccounts();
  const bHasReqAccounts = await hasRequestAccounts();

  if (!bHasAccounts && !bHasReqAccounts) {
    throw new Error("Please, check you have the accounts");
  }

  const helloWorld = new ethers.Contract(
    STR_CONTRACT_ADDRESS,
    ARR_CONTRACT_INTERFACE,
    new ethers.providers.Web3Provider(getEth())
  );

  const strGeneratedResponse = await helloWorld.hello();

  document.body.innerHTML = strGeneratedResponse;
};

run();
