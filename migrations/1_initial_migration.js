const Migrations = artifacts.require("Migrations");
const CoinHodlCoin = artifacts.require("CoinHodlCoin");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CoinHodlCoin);
};
