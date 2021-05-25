//"SPDX-License-Identifier: MIT"
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
* BEP20 Token.
* Name: Fuck crypto FUD
* Symbol: FCFUD
* Total supply: 1 000 000 FCFUD
* Decimals: 18
*
* https://eips.ethereum.org/EIPS/eip-20
*/
contract FuckCryptoFUD is ERC20 {

    /**
    * @notice Mint 1 000 000 FCFUD tokens and send to owner
    */
    constructor() ERC20("Fuck crypto FUD", "FCFUD") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
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
