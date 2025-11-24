//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract OrcaCoin is ERC20, Ownable {
    address public stakingContract;
    constructor() ERC20("OrcaCoin", "ORC") Ownable(msg.sender) {}
    function mint(address _to, uint256 _amount) external {
        require(
            msg.sender == stakingContract,
            "only staking contract can mint"
        );
        require(_amount > 0);
        _mint(_to, _amount);
    }
    function setStakingContract(address _stakingContract) external onlyOwner {
        stakingContract = _stakingContract;
    }
}
