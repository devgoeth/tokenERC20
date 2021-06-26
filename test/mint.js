import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const CryptoMasterCoinContract = artifacts.require("CryptoMasterCoin");

contract('CryptoMasterCoin', async accounts => {

    let CryptoMasterCoin;

    beforeEach(async function() {
        CryptoMasterCoin = await CryptoMasterCoinContract.deployed();
    });

    it('it is able to mint 100 000 CMC', async function(){
        console.log("  Contract address: " + CryptoMasterCoin.address);
        let totalSupply = await CryptoMasterCoin.totalSupply();
        assert.equal(ether(100000), totalSupply.valueOf());
    });

});

