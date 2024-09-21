import { ethers } from "hardhat";

const VeriConnectAddr = "0x8Cbb96d1C99e789b702843C72830c34C28679BFF";
async function register() {
  const signers = await ethers.getSigners();
  const registerer = signers[0];

  const veri = await ethers.getContractAt(
    "VeriConnect",
    VeriConnectAddr,
    registerer
  );

  await veri.registerCard()
}

register();
// npx hardhat run ignition/register.ts --network morph