// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract ERC20Creator is ERC20 {
    constructor(uint256 _supply)  ERC20("TokenC", "TKC") public {
        _mint(msg.sender, _supply * (10**18));
    }
}
