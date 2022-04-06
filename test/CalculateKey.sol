pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "truffle/Assert.sol";

contract TestKey {
	function testKey() public {
		bytes32 val = 0x6662356635636635646465363463373561393363396262376639623533663066;
		bytes32 fullup = 0x1111111111111111111111111111111111111111111111111111111111111111;
		//pay attention to priority
		bytes32 secretKey = (keccak256(abi.encodePacked(0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b))|val)^fullup;

		Assert.equal(true,false, string(abi.encodePacked("result:",Strings.toHexString(uint256(secretKey)))));
	}
}