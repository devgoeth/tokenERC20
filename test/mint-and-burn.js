import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const FuckCryptoFUDContract = artifacts.require("FuckCryptoFUD");

contract('FuckCryptoFUD', async accounts => {

    let FuckCryptoFUD;

    beforeEach(async function() {
        FuckCryptoFUD = await FuckCryptoFUDContract.deployed();
    });

    it('it is able to mint 1 000 000 FCFUD', async function(){
        console.log("  Contract address: " + FuckCryptoFUD.address);
        let totalSupply = await FuckCryptoFUD.totalSupply();
        assert.equal(ether(1000000), totalSupply.valueOf());
    });

    it('it is able to burn 1 000 000 FCFUD', async function(){
        let balance = await FuckCryptoFUD.balanceOf(accounts[0]);
        assert.equal(ether(1000000), balance.valueOf());

        FuckCryptoFUD.burnMyTokens(ether(1000000));
        balance = await FuckCryptoFUD.balanceOf(accounts[0]);
        assert.equal(0, balance.valueOf());
    });



});

