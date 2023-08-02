const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether')

}

describe('Token', () => {
	let token, accounts, deployer, reciever
	
	// Test go inside here...
	beforeEach(async () => {
		// Code goes here..
		//Fetch Token from Blockchain
		const Token = await ethers.getContractFactory("Token")
		token = await Token.deploy('My Token', 'MTK', '1000000')
		//fetch accounts
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		reciever = accounts[1]
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

	
	describe('Sending Token', () => {
		let amount, transaction, result

		describe('Success', () => {

			beforeEach(async () => {
				
				amount = tokens(100)
				transaction = await token.connect(deployer).transfer(reciever.address, amount)
				result = await transaction.wait()
			})
			
			it('Transfers token balances', async () => {
				//Transfer Tokens
				

				//ensure that tokens were transfered (balance changed)
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
				expect(await token.balanceOf(reciever.address)).to.equal(amount)

					
			})

			it('Emits a Transfer event', async () => {
				const event = result.events[0]
				expect(event.event).to.equal("Transfer")

				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(reciever.address)
				expect(args.value).to.equal(amount)
			})
		

		})

		describe('Failure', () => {
			it('rejects insufficient balances', async () => {
				// transfer more tokens the deployer has
				const invalidAmount = tokens(100000000)
				await expect(token.connect(deployer).transfer(reciever.address, invalidAmount)).to.be.reverted
			})
			it('Rejects invalid recipent', async () => {
				const amount = tokens(100)
				await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
			})
		})

	})
})


