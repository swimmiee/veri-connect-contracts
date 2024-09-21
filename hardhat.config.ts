import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const pk1 = process.env.PK1!;
const pk2 = process.env.PK2!;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    morph: {
      url: "https://rpc-holesky.morphl2.io",
      accounts: [pk1, pk2],
    },
    fhenix: {
      url: "https://api.testnet.fhenix.zone:7747",
      accounts: [pk1, pk2],
    },
    hardhat: {
      accounts: [
        {
          // 0x4947B01A9c99174aCE4a10cd555d84119D5F49a9
          privateKey: pk1,
          balance: "10000000000000000000000000",
        },
        {
          // 0x22E4Ee2e606716d9CCB0e987e77b3c9b10c8D45E
          privateKey: pk2,
          balance: "10000000000000000000000000",
        },
      ],
    },
  },
};

export default config;
