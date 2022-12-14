1. Deploy both Interest and Diamond smart contracts.

2. Truffle Console

3. Set initial variables for Diamond and Interest contracts
	- let coin = await Diamond.deployed();
	- let interest = await Interest.deployed();

4. Confirm addresses of both contracts and test if variables above work
	- coin.address;
	- interest.address;
	- BOTH should produce contract addresses

5. DIAMOND CONTRACT

a. Set USDC ABI (see notes)

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

6. INTEREST CONTRACT

a. Call the setTimePeriod function (as the contract owner) by passing in a value (in seconds) for which you want the term to be. For example a term of 1 month (30.44 days) is equivalent to 
2629743 seconds. This time period (term) can only be set once and will remain the term for the life of the contract. (use converter at https://www.convertunits.com and using CONVERT FROM 
SECONDS TO ______)

b. Call the setPercentage function. Passing in a value (in wei) which conforms to the following base point system (bps):
	- 10000 = 100%
	- 1000 = 10%
	- 100 = 1%
	- 10 = .1%
	- 1 = .01%
	- EX: An APY of 8.64% would be 864 / An APY of 24.25% would be 2425

c. Call the erc20Contract() getter function. Make sure the output address is the same address as your DIAMOND smart contract. (run coin.address; to confirm)

d. Call the timePeriodSet() getter function and ensure that the value returned is TRUE.

e. Call the timePeriod() getter function and ensure that the value returned is the term (in seconds) you chose in Step 6a above.

f. Call the percentageSet() getter function and ensure that the value returned is TRUE.

g. Call the percentageBasisPoints() getter function and ensure that the value returned is the one you chose in Step 6b above.

h. Call the owner() getter function and ensure that the value returned is your newly created account address (the interest earner smart contract's owner - you).

i. Once the above is complete, transfer the Diamonds to the INTEREST smart contract.

SOURCE: https://github.com/second-state/interest-earner-smart-contract   
