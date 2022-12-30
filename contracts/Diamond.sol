// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
import "@openzeppelin/contracts/governance/utils/IVotes.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract Diamond is ERC20, Ownable, ReentrancyGuard, ERC20Permit, ERC20Votes {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    // IERC20(usdctoken).safeTransferFrom(_msgSender(), address(this), _amount);
    uint public price = 1000000;
    uint public poolPercent = 0; //set this back to 80 if value fails
    uint public Earning = 0;
    uint public treasuryPercent = 3; //set this back to 20 if value fails
    address public treasuryAddress;
    uint public buyPercent = 0; //set this back to 90 if value fails
    uint public referralPercent = 0; //set this back to 2 if value fails
    uint public incPercent = 103; //set this back to 110 if value fails
    uint denominator = 100;
    uint public stableDec = 6;
    IERC20 public USDC;
    uint public ad1 = 0;
   
   
    constructor(address _usdc , address _treasuryAddress) public ERC20("Diamond", "DIA") ERC20Permit("Diamond") Ownable() ReentrancyGuard() {
        USDC = IERC20(_usdc);
        treasuryAddress = _treasuryAddress;
    }
        function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }


    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }


    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }


    function mintInternal(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    

    function mint(address _receiver , uint _amount) internal {
        _mint(_receiver, _amount);
    }
    

    // If this stablecoin is being backed by an existing crypto, specify the decimal places as the crypto backing the stablecoin.
    // This stablecoin is backed by USDC and USDC has 6 decimal places, so I am specifying 6 here for decimals.
    function decimals() public view virtual override returns (uint8){
        return 6;
    }


    function burn(address _sender , uint _amount) internal {
        require(this.balanceOf(_sender) >= _amount);
        _burn(_sender, _amount);  
    }


    function changeTreasury(address _treasuryAddress) public onlyOwner() {
        treasuryAddress = _treasuryAddress;
    }


    function buy(uint _amount, address _referer ) public nonReentrant() {
        uint Tf = 0;
        uint Tref = 0 ;      
        // The line of code below is the fee charged to the buyer on the buy. Look at the state variables incPercent and denominator
	// For example, if a buyer pays 1000 USDC and the incPercent = 101, and denominator = 100, then 101/100 = 1.01.
        // 1000 * 1.01 = 1010. 1010 - 1000 = 10. The buyer would pay 10 as a fee to buy 1000 Diamonds with 1000 USDC
        uint incAmount =  _amount.mul(incPercent).div(denominator);
        uint incPrice = incAmount.mul(price).div(10**stableDec);
        uint accPrice = _amount.mul(price).div(10**stableDec);
        uint diffPrice = incPrice.sub(accPrice);
        uint treasuryRec = diffPrice.mul(treasuryPercent).div(denominator);
        uint poolRec = diffPrice.mul(poolPercent).div(denominator);
        if(_referer != address(0)) {
            uint refererAmt = treasuryRec.mul(referralPercent).div(denominator);
            // USDC.transferFrom(msg.sender, address(this), accPrice );
            IERC20(address(USDC)).safeTransferFrom(msg.sender, address(this), accPrice);
            // USDC.transferFrom(msg.sender, address(this), poolRec );
            IERC20(address(USDC)).safeTransferFrom(msg.sender, address(this), poolRec);
            Tf = poolRec;
            Earning = Earning.add(poolRec);
            // USDC.transferFrom(msg.sender, _referer, refererAmt );
            IERC20(address(USDC)).safeTransferFrom(msg.sender, _referer, refererAmt);
            // USDC.transferFrom(msg.sender, treasuryAddress, treasuryRec.sub(refererAmt));
            IERC20(address(USDC)).safeTransferFrom(msg.sender, treasuryAddress, treasuryRec.sub(refererAmt));
            Tref = treasuryRec.sub(refererAmt) ;
        } else {
           // USDC.transferFrom(msg.sender, address(this), accPrice );
           IERC20(address(USDC)).safeTransferFrom(msg.sender, address(this), accPrice);
           // USDC.transferFrom(msg.sender, address(this), poolRec );
           IERC20(address(USDC)).safeTransferFrom(msg.sender, address(this), poolRec);
           Tf = poolRec;
           Earning = Earning.add(poolRec);
           // USDC.transferFrom(msg.sender, treasuryAddress, treasuryRec);
           IERC20(address(USDC)).safeTransferFrom(msg.sender, treasuryAddress, treasuryRec);
           Tref = treasuryRec ;        
        }
        updateBuyPrice(Tf,incPrice,Tref);
        mint(msg.sender, _amount);        
    }


    function updateBuyPrice(uint Tf, uint Tpa, uint Tref) internal {
        // price = price+  tPool/(this.totalSupply()+ (tBuy-tTreasury)/price)
        // uint subD1 = tBuy.sub(tTreasury);
        // uint subD2 = subD1.div(price);
        // uint den =  subD2.add(this.totalSupply());
        // ad1 = tPool.div(den);
        // price = price.add(ad1);
        uint subD1 = Tpa.sub(Tref);
        uint subD2 = subD1.mul(10**18).div(price);
        uint den =  subD2.add(this.totalSupply());
        uint ad1 = Tf.mul(10**18).div(den);
        price = price.add(ad1);
    }


    function sell(uint _amount) public nonReentrant(){
        uint tax = _amount.mul(10).div(100);
        uint treasuryRec = tax.mul(treasuryPercent).div(denominator);
        uint poolRec = tax.mul(poolPercent).div(denominator);
        // this.transferFrom(msg.sender, treasuryAddress, treasuryRec);
        // USDC.transfer(treasuryAddress, treasuryRec.mul(price).div(10**stableDec));
        IERC20(address(USDC)).safeTransfer(treasuryAddress, treasuryRec.mul(price).div(10**stableDec));
        // this.transferFrom(msg.sender, address(this), poolRec);
        // this.transfer(treasuryAddress, treasuryRec.mul(price).div(10**stableDec));        
        uint sendAmt = price.mul(_amount.sub(tax)).div(10 ** stableDec);
        Earning = Earning.add(poolRec.mul(price).div(10**stableDec));
        updateSellPrice(poolRec.mul(price).div(10**stableDec),_amount,poolRec);
        burn(msg.sender, _amount);
        // USDC.transfer(msg.sender, sendAmt);
        IERC20(address(USDC)).safeTransfer(msg.sender, sendAmt);      
    } 

    
    function USDCPoolBalance()  view external returns(uint){
        return USDC.balanceOf(address(this));
    }

    
    function updateSellPrice(uint Tf, uint Tss, uint Trep) internal {
        uint den = this.totalSupply().sub(Tss.sub(Trep));
        uint add1 = Tf.mul(10**18).div(den);
        price = price.add(add1);
    }


    function transferERC20(IERC20 token, address to, uint256 amount) payable public {
	require(msg.sender == owner(), "You are not authorized to withdraw USDC from this contract.");
	uint256 erc20balance = token.balanceOf(address(this));
	require(amount <= erc20balance, "Insufficient Funds.");
        token.transfer(to, amount);
    }
}
