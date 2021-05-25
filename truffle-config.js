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
        }
    },
    plugins: [
        'truffle-plugin-verify'
    ],
    api_keys: {
        bscscan: '1WIC9GJBQJ4DMH5KYTZZXY5CBFV2YGGE26'
    },
    compilers: {
        solc: {
            version: "0.8.4"
        }
    }
};
