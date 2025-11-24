// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
interface IOrca {
    function mint(address _to, uint256 _amount) external;
}
struct UserInfo {
    uint256 amount;
    uint256 unClaimedRewards;
    uint256 lastUpdated;
}
contract Contract is Ownable {
    mapping(address => UserInfo) public userInfo;

    uint256 public constant TOKENS_PER_SEC_PER_ETH = 20 * 1e18; //assuming tokens have 18 decimal places
    IOrca public tokenAddress;

    constructor(IOrca _token) Ownable(msg.sender) {
        tokenAddress = _token;
    }
    function _lazyUpdate(address account) internal {
        UserInfo storage user = userInfo[account];
        if (user.lastUpdated == 0) {
            user.lastUpdated = block.timestamp;
            return;
        }
        uint256 totalSeconds = block.timestamp - user.lastUpdated;

        uint256 numerator = totalSeconds * user.amount * TOKENS_PER_SEC_PER_ETH;
        uint256 rewards = numerator / 1e18;

        user.lastUpdated = block.timestamp;
        user.unClaimedRewards += rewards;
    }
    function stake() public payable {
        require(msg.value > 0);
        UserInfo storage user = userInfo[msg.sender];

        _lazyUpdate(msg.sender);
        user.amount += msg.value;
    }
    function unStake(uint256 amount) public {
        UserInfo storage user = userInfo[msg.sender];

        require(user.amount >= amount, "Insufficient funds");
        require(amount > 0, "amount must be greater than 0");
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Tx failed");
        _lazyUpdate(msg.sender);
        user.amount -= amount;
    }
    function claimRewards() public {
        UserInfo storage user = userInfo[msg.sender];

        _lazyUpdate(msg.sender);

        tokenAddress.mint(msg.sender, user.unClaimedRewards);
        user.unClaimedRewards = 0;
    }
    function getRewards(address account) external view returns (uint256) {
        UserInfo storage user = userInfo[account];
        uint256 totalSeconds = block.timestamp - user.lastUpdated;

        uint256 numerator = totalSeconds * user.amount * TOKENS_PER_SEC_PER_ETH;
        uint256 rewards = numerator / 1e18;
        return user.unClaimedRewards + rewards;
    }
}
