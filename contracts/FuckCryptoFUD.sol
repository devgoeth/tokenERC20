//"SPDX-License-Identifier: MIT"
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
* BEP20 Token.
* Name: CRYPTO MASTER COIN
* Symbol: CMC
* Total supply: 100 000 CMC
* Decimals: 18
*
* https://eips.ethereum.org/EIPS/eip-20
*/
contract CryptoMasterCoin is ERC20 {

    /**
    * @notice Mint 100 000 CMC tokens and send to owner
    */
    constructor() ERC20("CRYPTO MASTER COIN", "CMC") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    /**
    * @notice Function for burn your tokens
    *
    * @param _amount Amount tokens for burn
    */
    function burnMyTokens(uint _amount) public {
        _burn(msg.sender, _amount);
    }
}
