//"SPDX-License-Identifier: MIT"
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* BEP20 Token.
* Name: Coin Hodl can be sold 24 hours after purchase
* Symbol: Coin Hodl
* Total supply: 10 000 000 Coin Hodl 24h
* Decimals: 18
*
* Coin Hodl can be sold 24 hours after purchase
* https://eips.ethereum.org/EIPS/eip-20
*/
contract CoinHodlCoin is ERC20, Ownable {

    mapping (address => uint) public lastIncomes;
    mapping (address => bool) public whiteList;

    /**
    * @notice Mint 10 000 000 tokens and send to owner
    */
    constructor() ERC20("Coin Hodl can be sold 24 hours after purchase", "CoinHodl24h") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override
    {
        super._beforeTokenTransfer(from, to, amount);

        if (!whiteList[from]) {
            require(timeLimit(from) >= 86400, "Hodl period is not reached, wait pls.");
        }
        lastIncomes[to] = block.timestamp;
    }

    /**
   * @notice Checking the time limit
   *
   * @param _address Address of token holder
   */
    function timeLimit(address _address) public view returns(uint) {
        uint difference = block.timestamp - lastIncomes[_address];
        return difference;
    }

    /**
   * @notice Add to white list
   *
   * @param _address Member address of white list
   */
    function addToWhiteList(address _address) onlyOwner public {
        whiteList[_address] = true;
    }

    /**
   * @notice Remove from white list
   *
   * @param _address Member address of white list
   */
    function removeFromWhiteList(address _address) onlyOwner public {
        whiteList[_address] = false;
    }
}
