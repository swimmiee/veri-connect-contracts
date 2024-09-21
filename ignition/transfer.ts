import { ethers } from "hardhat";

const VeriConnectAddr = "0x8Cbb96d1C99e789b702843C72830c34C28679BFF";
async function mint() {
  const signers = await ethers.getSigners();
  const registerer = signers[0];

  const veri = await ethers.getContractAt(
    "VeriConnect",
    VeriConnectAddr,
    registerer
  );

  await veri.mintCardToFriend("0xAA289325d1afc4AA040281b10dD9f10A8560D296")
}

mint();
// npx hardhat run ignition/transfer.ts --network morph