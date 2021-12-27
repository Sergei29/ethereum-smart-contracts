import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

/**
 * @description pulls and deploys the contract
 * @returns {Promise<Object>} resolving to Solidity contract deployed
 */
export const deploy = async () => {
  const HelloWorldFactory = await ethers.getContractFactory("HelloWorld");
  const HelloWorld = await HelloWorldFactory.deploy();
  await HelloWorld.deployed();

  return HelloWorld;
};

export const sayHello = async (contact: Record<string, any>) => {
  const strGreeting = await contact.hello();
  console.log("Say hello: ", strGreeting);
};

deploy()
  .then(sayHello)
  .catch((error) => {
    console.error(error.toString());
  });
