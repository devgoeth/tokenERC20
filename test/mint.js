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

});

