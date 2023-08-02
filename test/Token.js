const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')

}

describe('Token', () => {
	let token, accounts, deployer
	
	// Test go inside here...
	beforeEach(async () => {
		// Code goes here..
		//Fetch Token from Blockchain
		const Token = await ethers.getContractFactory("Token")
		token = await Token.deploy('My Token', 'MTK', '1000000')
		//fetch accounts
		accounts = await ethers.getSigners()
		deployer = accounts[0]
	})

	describe('Deployment', () => {
		const name = 'My Token'
		const symbol = 'MTK'
		const decimals = '18'
		const totalSupply = tokens('1000000')
	
		it('has correct name', async () => {
			//Check that name is correct
			expect(await token.name()).to.equal(name)
		})


		it('has correct symbol', async () => {
			// Read token name 
			//Check that name is correct
			expect(await token.symbol()).to.equal(symbol)
		})

		it('has correct decimals', async () => {
			// Read token name 
			//Check that name is correct
			expect(await token.decimals()).to.equal(decimals)
		
		})

		it('has correct total supply', async () => {
			// Read token name 

			expect(await token.totalSupply()).to.equal(totalSupply)

		})

		it('assigns total supply to deployer', async () => {
	
			expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)

		
		})
	})

})
