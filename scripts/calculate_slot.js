//https://eth.wiki/json-rpc/API#eth_getstorageat[
//https://docs.soliditylang.org/en/v0.8.13/internals/layout_in_storage.html
//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x2", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000005d"}

//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x63323439616436352d366236622d343864622d613936362d6266303061396635"}

//curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace", "latest"], "id": 1}' https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51
//{"jsonrpc":"2.0","id":1,"result":"0x62376233407468616c6c6f2e696f000000000000000000000000000000000000"}

const fs = require("fs");
const assert = require("assert");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

//v1
/*(async () => {
	//Don't forget to padding zero. sha3 hash string not value.
	console.log("result:" + Web3.utils.sha3("0x0000000000000000000000000000000000000000000000000000000000000002"));
	//c249ad65-6b6b-48db-a966-bf00a9f5b7b3@thallo.io
	console.log("email address:" + Web3.utils.hexToString("0x63323439616436352d366236622d343864622d613936362d6266303061396635") + Web3.utils.hexToString("0x62376233407468616c6c6f2e696f000000000000000000000000000000000000"));
})();*/

function GetShortString(web3, data) {
	return web3.utils.hexToString(data.slice(0, data.length - 2));
}

async function GetLongString(web3, contract, slot, length) {
	const slot_size = 32;
	let base_slot = web3.utils.toBN(web3.utils.sha3(slot));

	let count = Math.ceil(length / slot_size);
	let data = "";
	for (let i = 0; i < count; i++) {
		data += web3.utils.hexToString(await web3.eth.getStorageAt(contract, "0x" + base_slot.addn(i).toString(16)));
	}
	return data;
}

async function GetString(web3, contract, slot) {
	assert(typeof (slot) === "string", "slot must be string");
	assert(web3.utils.isHexStrict(slot), "Please provide a hex slot string begin with 0x.");
	assert(typeof (contract) === "string", "contract must be string");
	assert(web3.utils.isHexStrict(contract), "Please provide a hex contract string begin with 0x.");
	assert(contract.length == 42, "contract must be 42 character string begin with 0x which represent address.")

	slot = web3.utils.padLeft(slot, 64);
	let data = await web3.eth.getStorageAt(contract, slot);
	if (web3.utils.toBN(data).and(web3.utils.toBN("0x1")).isZero())
		return GetShortString(web3, data);
	else {
		let length = web3.utils.hexToNumber("0x" + data.slice(data.length - 2, data.length));
		length -= 1;
		length /= 2;
		return GetLongString(web3, contract, slot, length);
	}
}

//v2
(async () => {
	const mnemonic = fs.readFileSync(".secret").toString().trim();
	let web3 = new Web3(new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51`));

	console.log("short string:" + await GetString(web3, "0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x1"));
	console.log("long string:" + await GetString(web3, "0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b", "0x2"));
})();