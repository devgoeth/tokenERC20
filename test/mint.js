import ether from './helpers/ether';

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const CoinHodlCoinContract = artifacts.require("CoinHodlCoin");

contract('CoinHodlCoin', async accounts => {

    let CoinHodlCoin;

    beforeEach(async function() {
        CoinHodlCoin = await CoinHodlCoinContract.deployed();
    });

    it('it is able to mint 10 000 000 CMC', async function(){
        console.log("  Contract address: " + CoinHodlCoin.address);
        let totalSupply = await CoinHodlCoin.totalSupply();
        assert.equal(ether(10000000), totalSupply.valueOf());
    });

});

