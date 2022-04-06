//https://eth.wiki/json-rpc/API#eth_getstorageat[
//https://docs.soliditylang.org/en/v0.8.13/internals/layout_in_storage.html
//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x2", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000005d"}

//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x63323439616436352d366236622d343864622d613936362d6266303061396635"}

//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x62376233407468616c6c6f2e696f000000000000000000000000000000000000"}

const Web3 = require("web3");

(async () => {
	//Don't forget to padding zero. sha3 hash string not value.
	console.log("result:" + Web3.utils.sha3("0x0000000000000000000000000000000000000000000000000000000000000002"));
	//c249ad65-6b6b-48db-a966-bf00a9f5b7b3@thallo.io
	console.log("email address:"+Web3.utils.hexToString("0x63323439616436352d366236622d343864622d613936362d6266303061396635")+Web3.utils.hexToString("0x62376233407468616c6c6f2e696f000000000000000000000000000000000000"));
})();