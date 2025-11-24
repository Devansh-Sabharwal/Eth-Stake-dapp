// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "src/OrcaCoin.sol";
contract OrcaCoinTest is Test {
    OrcaCoin c;
    function setUp() public {
        c = new OrcaCoin();
    }
    function testMint() public {
        c.setStakingContract(address(0xa));
        vm.expectRevert("only staking contract can mint");
        c.mint(address(0xb), 100);
        vm.prank(address(0xa));
        c.mint(address(0xb), 100);
        assertEq(c.balanceOf(address(0xb)), 100);
    }
}
