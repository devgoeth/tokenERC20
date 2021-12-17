require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");

const Web3 = require("web3");
const web3 = new Web3();

const mnemonic = fs.readFileSync(".secret").toString().trim();
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 7545, // Standard Ethereum port (default: none)
            network_id: "*" // Any network (default: none)
        },
        testnet: {
            provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
            network_id: 97,
            confirmations: 1,
            timeoutBlocks: 200,
            skipDryRun: true,
            production: true
        },
        bsc: {
            provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
            network_id: 56,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
            gasPrice: web3.utils.toWei('10', 'gwei')
        },
        rinkeby: {
            provider: () => new HDWalletProvider(
                mnemonic,
                `https://rinkeby.infura.io/v3/c2bf1af4af5d46398930cc5bfcd8596f`,
                0,
                10
            ),
            network_id: 4,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            networkCheckTimeout: 1000000,
            gasPrice: web3.utils.toWei('20', 'gwei')
            //from: "0x9fF8c5a477fAAC59Fda54b7c517D4dC1674ebe56"
        },
    },
    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        bscscan: '7283IHKQ28JWK6ERAIUNH78A8HSQ8U1TVX'
    },
    compilers: {
        solc: {
            version: "0.8.4"
        }
    }
};
