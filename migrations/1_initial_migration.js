const Migrations = artifacts.require("Migrations");
const FuckCryptoFUD = artifacts.require("FuckCryptoFUD");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(FuckCryptoFUD);
};
