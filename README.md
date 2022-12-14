1. Deploy Diamond smart contract.

2. Truffle Console

3. Set initial variables for Diamond contract.
	- let coin = await Diamond.deployed();

4. Confirm addresses of both contracts and test if variables above work
	- coin.address;
	- output should produce contract addresses

5. DIAMOND CONTRACT

a. Set USDC ABI 

const usdc_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

b. Link USDC ABI to USDC contract
	- const usdc = new web3.eth.Contract(usdc_abi, '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C');
		- Replace 0xD87...CCd9C with the correct USDC contract address

c. Call functions in USDC contract
	- usdc.methods;

d. Call APPROVE function in USDC contract to give Damond contract approval to spend allowed funds
	- usdc.methods.approve('DIAMOND', 'amount').send({from: 'USER WALLET ADDRESS'});

e. Call TRANSFER function in USDC contract to transfer USDC funds to DIAMOND smart contract
	- usdc.methods.transfer('DIAMOND', 'amount').send({from: 'USER WALLET ADDRESS'});

f. Verify funds have been sent to DIAMOND address
	- usdc.methods.balanceOf('DIAMOND').call();

g. Buy Diamond stablecoins from contract
	- coin.buy('amount', 'USER WALLET ADDRESS', {from: 'USER WALLET ADDRESS'});

h. Import DIAMOND contract into wallet (Metamask), etc.

i. If you wish to sell DIAMOND back to contract, execute sell function in Diamond contract.
	- coin.sell('amount');  
