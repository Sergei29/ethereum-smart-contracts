## Your First Contract

mkdir jpegdegens
cd jpegdegens
git init
yarn init -y
yarn add -D hardhat
npx hardhat

## Typical Structure

Before we create our first contract, lets talk about folder structure.

jpegdegens

- contracts/
  - YourContracs.sol
    ...
- scripts/
  - deploy.ts
    ...
- test/
  - sometest.js
    ...

## HardHat

Its a tool for building and deploying contracts to any ethereum network.

## Create first contract.

Create a file in contracts folder named HelloWorld.sol

## Contract code

```
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract HelloWorld {
    function hello() public pure returns (string memory) {
        return "Hello, World";
    }
}
```

## Compile time

- `npx hardhat compile`

## Did you get an error?

Did you get this error?

```
Error HH606: The project cannot be compiled, see reasons below.

The Solidity version pragma statement in these files don't match any of the configured compilers in your config. Change the pragma or configure additional compiler versions in your hardhat config.

  * contracts/HelloWorld.sol (^0.8.0)

To learn more, run the command again with --verbose

Read about compiler configuration at https://hardhat.org/config
```

- Fix the version and lets recompile. in `hardhat.config.ts`:
  `module.exports = {`
  `solidity: "0.8.10",`
  `};`

- npx hardhat compile
  Compiling 1 file with 0.8.4
  Compilation finished successfully

## LETS TEST!!!!

- add `import "@nomiclabs/hardhat-waffle";` to the top of `hardhat.config.ts`.

1. First create a test folder.
2. Second, create the test...

```
import _ from "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
    it("should get the hello world", async () => {
        const HW = await ethers.getContractFactory("HelloWorld");
        const hello = await HW.deploy();

        expect(await hello.hello()).to.equal("Hello, World");
    });
});
```

## Execute the test

- `npx hardhat test`

## Lets create a deploy script.

Lets create this into a deploy script that can actually deploy our contract onto a network.
create `scripts` directory and add `deploy-hello.ts` file:

```
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
```

on one terminal run:

- `npx hardhat node`

on the second terminal run:

- `npx hardhat run scripts/deploy-hello.ts --network localhost`

## Lets go deeper.

Lets inspect the our local network
Lets call our contract that is now deployed on the network.

on our first terminal after we have run the `npx hardhat node`:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
...

```

the ehtereum node accounts created

and after we have deployed our HelloWorld contract, on the first terminal it will show:

```
...
eth_sendTransaction
  Contract deployment: HelloWorld
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x5dba37e90caef73898d9808c0fb27baa71296010651f11425dcd56e38c2d71ec
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            135055 of 135055
  Block #1:            0x606410dee85f344b0eefa4df4ab9b908bf1a098831a48db11013ce571ac3e723

...
eth_call
  Contract call:       HelloWorld#hello
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0x5fbdb2315678afecb367f032d93f642f64180aa3

```

## The log says:

- At account #0, No: `...2266`,
- New Contract deployed at the address: `...0aa3`
  ...
- A method has been called `HelloWorld#hello` from account #0 `...2266` to contract `...0aa3`

## Lets communicate from the browser.

Go and get the MetaMask Extension

## Import a test account into your metamask

- Copy any of the accounts from the initial output.
- Video link: https://res.cloudinary.com/dlw2jic1w/video/upload/v1640684212/tutorials/MetaMaskAddAccount_r8orsg.mkv
- Consistent. Meaning you can keep this in your account.
- Make sure metamask is pointed to "localhost"

## Terminology

- `Web3`: In general means blockchain tech with some purpose
- `Ethereum`: The blockchain we will we be developing with
- `Provider`: From Ethers docs:
  "A Provider abstracts a connection to the Ethereum blockchain, for issuing queries and sending state changing transactions."

- `Contract`: This is code written in Solidity that has been compiled and deployed onto a network. It has an address that is no different than a wallet address.
- `Wallet`: The blockchain, its a private + public key combo (really you just need a private key).

## Technology

- `ethers`: import { ethers } from "ethers";. This is lib that abstracts the complication of communication.
- `hardhat`: Its backbone of any project these days. It provides compiling, testing, and deployment support.
  When you get a getContractFactory("HelloWorld") it actually just loads the file from the json build file.
- `metamask`: Its a browser plugin for wallets. "The Defacto Standard"
  You will notice that in the code on the web I don't reference hardhat. That is because hardhat is a support lib.

### Smart Contract Deployment Diagram explained:

- https://res.cloudinary.com/dlw2jic1w/video/upload/v1640703515/tutorials/SmartContractDeployDiagram_bq7kis.mkv
