const fs = require("fs");
let assert = require("assert");
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const ThalloHire1 = require("./ThalloHire1.js");


(async () => {
	const mnemonic = fs.readFileSync(".secret").toString().trim();
	let web3 = new Web3(new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/e61d7489169641adb4ba7a698ad81d51`));

	const id = "huanmie";
	const key = "0xeefb6c776cf2eeacffff6c672deaa626f2286a6e68eaeaa66668ef64aaefe3f6";

	const contractAddress = "0x006eCb9efFA194df5ce192AF1e15eFBaa8a3c87b";
	const accounts = await web3.eth.getAccounts();
	let contract = new web3.eth.Contract(ThalloHire1.abi, contractAddress, { from: accounts[0] });
	console.log("addCandidateIdToWhitelist result:" + await contract.methods.addCandidateIdToWhitelist(key, id).send());
	assert(await contract.methods.candidateIdIsWhitelisted(id).call(), "Failed to addCandidateIdToWhitelist!");
})();