require("dotenv").config;
require("@nomiclabs/hardhat-waffle");
// require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
// const CONSTANTS = require("../../../utils/constants");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "rinkeby",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/8996ae3c08254f178506a939f8d4ba72",
      accounts: [process.env.PRIVATE_KEY],
    },
    // hardhat: {
    //   chainId: 1337
    // }
  },
  etherscan: {
    // Add your api key here
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
