var Diamond = artifacts.require("./contracts/Diamond.sol");

module.exports = function(deployer) {
    deployer.deploy(Diamond, 'USDC CONTRACT ADDRESS', 'DEPLOYER WALLET ADDRESS');
};


