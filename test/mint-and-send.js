import ether from './helpers/ether';
import EVMRevert from './helpers/EVMRevert';
import { advanceBlock } from './helpers/advanceToBlock';
import increaseTime from "./helpers/increaseTime";

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const CoinHodlCoinContract = artifacts.require("CoinHodlCoin");

contract('CoinHodlCoin', async accounts => {

    before(async function () {
        await advanceBlock();
    });

    let CoinHodlCoin;

    beforeEach(async function() {
        CoinHodlCoin = await CoinHodlCoinContract.deployed();
    });

    it('it is able to mint 10 000 000 CH24', async function(){
        let totalSupply = await CoinHodlCoin.totalSupply();
        assert.equal(totalSupply.valueOf(), ether(10000000));
    });

    it('it is able to send 1 CH24', async function(){
        let balance = await CoinHodlCoin.balanceOf(accounts[0]);
        assert.equal(balance.valueOf(), ether(10000000));

        let lastIncomes = await CoinHodlCoin.lastIncomes(accounts[1]);
        assert.equal(lastIncomes.valueOf(), 0);

        await CoinHodlCoin.transfer(accounts[1], ether(1));

        balance = await CoinHodlCoin.balanceOf(accounts[0]);
        assert.equal(balance.valueOf(), ether(10000000 - 1));

        lastIncomes = await CoinHodlCoin.lastIncomes(accounts[1]);
        assert.notEqual(lastIncomes.valueOf(), 0);
    });

    it('it is not able to send 1 CH24 before 24 hours', async function(){
        await CoinHodlCoin
            .transfer(accounts[2], ether(1), { from: accounts[1] })
            .should
            .be
            .rejectedWith(EVMRevert);
    });

    it('time shifting', async function(){
        let difference = await CoinHodlCoin.timeLimit(accounts[1]);

        await increaseTime(86400);

        difference = await CoinHodlCoin.timeLimit(accounts[1]);
    });

    it('it is able to send 1 CH24 after time limit reached', async function(){
        let balance = await CoinHodlCoin.balanceOf(accounts[1]);
        assert.equal(balance.valueOf(), ether(1));

        let timeLimit = await CoinHodlCoin.timeLimit(accounts[1]);
        assert.isAbove(parseInt(timeLimit.valueOf()), 86400);

        await CoinHodlCoin.transfer(accounts[2], ether(1), { from: accounts[1] });

        balance = await CoinHodlCoin.balanceOf(accounts[2]);
        assert.equal(balance.valueOf(), ether(1));

        let lastIncomes = await CoinHodlCoin.lastIncomes(accounts[2]);
        assert.notEqual(lastIncomes.valueOf(), 0);
    });
});

