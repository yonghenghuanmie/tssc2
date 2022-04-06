const abi=
[{
	"inputs": [
	  {
		"internalType": "bytes32",
		"name": "key",
		"type": "bytes32"
	  },
	  {
		"internalType": "string",
		"name": "candidateId",
		"type": "string"
	  }
	],
	"name": "addCandidateIdToWhitelist",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"inputs": [
	  {
		"internalType": "string",
		"name": "candidateId",
		"type": "string"
	  }
	],
	"name": "candidateIdIsWhitelisted",
	"outputs": [
	  {
		"internalType": "bool",
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "view",
	"type": "function"
}
];

//global.abi=abi;
module.exports.abi=abi;