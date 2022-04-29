// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;

        return c;
    }
}

contract Processor {
    address payable public sushiMaker;
    address payable public myFee;
    
    uint256 public fee = 20;
    address public governance;

    constructor(
        address payable _sushiMaker, 
        address payable _myFee,
        address _governance
        ) public {
        sushiMaker = _sushiMaker;
        myFee = _myFee; 
        governance=_governance;       
    }

     receive() external payable {
        distribute();
    }

    function distribute() public payable {
        uint256 weiAmount = msg.value;
        uint256 sushiMakerAmount = weiAmount*(100-fee)/100;
        myFee.transfer(weiAmount-sushiMakerAmount);
        sushiMaker.transfer(sushiMakerAmount);
    }

    function changeFee(uint256 _fee) public returns(bool) {
        require(msg.sender == governance, "Not Allowed");
        require(_fee < 100, "Value will break the Processor SC (0)");
        require(_fee > 0, "Value will break the Processor SC (1)");
        
        fee = _fee;
        
        return true;

    }
    
    
}