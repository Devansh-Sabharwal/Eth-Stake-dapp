// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/Contract.sol";
import "src/OrcaCoin.sol";

contract TestContract is Test {
    Contract c;
    OrcaCoin t;

    function setUp() public {
        t = new OrcaCoin();
        console.log("Address of orca contract", address(t));
        c = new Contract(IOrca(address(t)));
        console.log("Address of staking contract", address(c));

        t.setStakingContract(address(c));
    }

    function testStake() public {
        vm.deal(address(this), 500 ether);
        c.stake{value: 300 ether}();
        assertEq(address(this).balance, 200 ether);
    }
    function testUnstake() public {
        vm.deal(address(this), 500 ether);
        c.stake{value: 300 ether}();
        c.unStake(2 ether);
        assertEq(address(this).balance, 202 ether);
    }
    function testClaimRewards() public {
        vm.deal(address(this), 50 ether);
        c.stake{value: 30 ether}();
        assertEq(address(this).balance, 20 ether);

        vm.warp(block.timestamp + 100 seconds);

        console.log(c.getRewards(address(this)));
        c.claimRewards();
        console.log(t.balanceOf(address(c)));

        assertEq(t.balanceOf(address(this)), 60000000000000000000000);
    }
    receive() external payable {}
}
