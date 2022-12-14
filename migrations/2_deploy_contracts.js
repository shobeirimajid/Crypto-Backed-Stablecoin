var Diamond = artifacts.require("./contracts/Diamond.sol");

module.exports = function(deployer) {
    deployer.deploy(Diamond, '0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C', '0x73bB00CE96121d4f07bae783c0B79fA1c2801c4F');
};


