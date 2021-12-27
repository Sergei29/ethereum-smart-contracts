import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
  it("should say hi", async () => {
    /**
     * @description
     * 1. setup
     * 2. deploy contract
     * 3. call our function `hello()`
     */

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed();

    const strReturnValue = await hello.hello();

    expect(strReturnValue).to.equal("Hello World");
  });
});
