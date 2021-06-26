const Migrations = artifacts.require("Migrations");
const CryptoMasterCoin = artifacts.require("CryptoMasterCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CryptoMasterCoin);
};
