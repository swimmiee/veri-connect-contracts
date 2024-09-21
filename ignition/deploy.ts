import { ethers } from "hardhat";

async function deploy() {
  const signers = await ethers.getSigners();
  const owner = signers[0];
  const factory = await ethers.getContractFactory("VeriConnect", owner);
  const veri = await factory.deploy(owner.address, "");
  await veri.waitForDeployment();

  const addr = await veri.getAddress();
  console.log("VeriConnect address:", addr);
}

deploy();

// npx hardhat run ignition/deploy.ts --network localhost
