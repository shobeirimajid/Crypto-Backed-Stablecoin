1. Deploy Diamond smart contract.

2. Truffle Console

3. Set initial variables for Diamond contract.
	- let coin = await Diamond.deployed();

4. Confirm addresses of both contracts and test if variables above work
	- coin.address;
	- output should produce contract addresses

5. Set USDC ABI 

const usdc_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

6. Link USDC ABI to USDC contract

const usdc = new web3.eth.Contract(usdc_abi, 'USDC CONTRACT ADDRESS');

7. Call functions in USDC contract
	- usdc.methods;

8. Call APPROVE function in USDC contract to give Damond contract approval to spend allowed funds

usdc.methods.approve('DIAMOND', 'amount').send({from: 'USER WALLET ADDRESS'});

9. Call TRANSFER function in USDC contract to transfer USDC funds to DIAMOND smart contract

usdc.methods.transfer('DIAMOND', 'amount').send({from: 'USER WALLET ADDRESS'});

10. Verify funds have been sent to DIAMOND address

usdc.methods.balanceOf('DIAMOND').call();

11. Buy Diamond stablecoins from contract

coin.buy('amount', 'USER WALLET ADDRESS', {from: 'USER WALLET ADDRESS'});

12. Import DIAMOND contract into wallet (Metamask), etc.

13. If you wish to sell DIAMOND back to contract, execute sell function in Diamond contract.

coin.sell('amount'); 

DISCLAIMER: The contracts in this repository have not been audited. Use at your own risk. It is highly recommended you audit these contracts with an independent third party auditing company if you plan to use these contracts in a production environment where real crypto will be traded. By using these contracts, you hold me harmless from any loss of funds that may result from improper use or modifications of these contracts. 
