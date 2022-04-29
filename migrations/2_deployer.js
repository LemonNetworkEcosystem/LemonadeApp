const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol')
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol')
const WETH = artifacts.require('WETH.sol')
const MockERC20 = artifacts.require('MockERC20.sol')
const SushiToken = artifacts.require('SushiToken.sol')
const MasterChef = artifacts.require('MasterChef.sol')
const SushiBar = artifacts.require('SushiBar.sol')
const SushiMaker = artifacts.require('SushiMaker.sol')
const Migrator = artifacts.require('Migrator.sol')
const Processor = artifacts.require('Processor.sol')

const SushiRestaurant = artifacts.require('SushiRestaurant.sol')

const PoolUnlockerLMD = artifacts.require('PoolUnlockerLMD.sol')

const FarmUnlockerLMNLMD = artifacts.require('FarmUnlockerLMNLMD.sol')
const FarmUnlockerLMNEWT = artifacts.require('FarmUnlockerLMNEWT.sol')
const FarmUnlockerLMDEWT = artifacts.require('FarmUnlockerLMDEWT.sol')

//! EXTRA (Start)
const ERC2OCreator = artifacts.require('ERC20Creator.sol')
const ERC2OCreator1 = artifacts.require('ERC20Creator1.sol')
//! EXTRA (End)

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses

  //   await deployer.deploy(WETH)
  //   const weth = await WETH.deployed()

  //TODO: 1 (Start)

  //   await deployer.deploy(ERC2OCreator, 100000)
  //   const tokenC = await ERC2OCreator.deployed()
  //   await deployer.deploy(ERC2OCreator1, 100000)
  //   const tokenD = await ERC2OCreator1.deployed()

  //   //TODO: 1
  //   const tokenA = await MockERC20.new(
  //     'Token A',
  //     'TKA',
  //     web3.utils.toWei('10000'),
  //   )
  //   const tokenB = await MockERC20.new(
  //     'Token B',
  //     'TKB',
  //     web3.utils.toWei('10000'),
  //   )

  //! WILL BE REMOVED (Start)
  //! WILL BE REMOVED (End)

  //   await deployer.deploy(Factory, admin)
  //   const factory = await Factory.deployed()

  //   //TODO: 1
  //   await factory.createPair(weth.address, tokenA.address)
  //   await factory.createPair(weth.address, tokenB.address)
  //   //TODO: 1 (End)

  const FACTORY_ADDRESS = '0x9d045F9bAA77769986871D8e3dD83b2693A1C516'
  const WETH_ADDRESS = '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd'
  const TOKEN_A = '0x19F38518FAffB831514CC5434A5d744b7719a246'
  const TOKEN_B = '0x801FD5391C3AA6cD009C11a76F46bEb9e2C5c2B6'

  // await deployer.deploy(Router, FACTORY_ADDRESS, WETH_ADDRESS)
  // const router = await Router.deployed()

  // await deployer.deploy(SushiToken)
  // const sushiToken = await SushiToken.deployed()

  const SUSHI_ADDRESS = '0xDe7238D437a1c3815039e3F4F9C35bfb1FB1FB96'
  const SUSHI_BAR_ADDRESS = '0x4222d8Ec4E204f1A8353C1A9f80C5099466FB162'

  // await deployer.deploy(
  //   MasterChef,
  //   SUSHI_ADDRESS, //! sushiToken.address,
  //   admin,
  //   web3.utils.toWei('100'),
  //   1651184573, //? Start Block --> mint SUSHI  (17650291)
  //   1659218400, //? End Block for BONUS_PERIODE (19064110)
  // )
  // const masterChef = await MasterChef.deployed()
  // // await sushiToken.transferOwnership(masterChef.address)

  // await deployer.deploy(SushiBar, SUSHI_ADDRESS) //! sushiToken.address
  // const sushiBar = await SushiBar.deployed()

  await deployer.deploy(
    SushiMaker,
    FACTORY_ADDRESS,
    SUSHI_BAR_ADDRESS, //! sushiBar.address,
    SUSHI_ADDRESS, //! sushiToken.address,
    WETH_ADDRESS,
    //! Imply changes on: SUSHI_MAKER.sol
    admin,
    '0x18D28fD53Ae2695E8Fe8AE2D4C344a68b4648b26', //? LMN Developer
  )
  const sushiMaker = await SushiMaker.deployed()

  // // await deployer.deploy(
  // //   SushiRestaurant,
  // //   sushiToken.address,
  // //   '999999390274979584',
  // // )

  // // const sushiRestaurant = await SushiRestaurant.deployed()

  // await deployer.deploy(PoolUnlockerLMD, admin)
  // const poolUnlockerLMD = await PoolUnlockerLMD.deployed()

  // await deployer.deploy(FarmUnlockerLMNLMD, admin)
  // const farmUnlockerLMNLMD = await FarmUnlockerLMNLMD.deployed()

  // await deployer.deploy(FarmUnlockerLMNEWT, admin)
  // const farmUnlockerLMNEWT = await FarmUnlockerLMNEWT.deployed()

  // await deployer.deploy(FarmUnlockerLMDEWT, admin)
  // const farmUnlockerLMDEWT = await FarmUnlockerLMDEWT.deployed()

  console.log(`
  
   const SUSHI_MAKER_ADDRESS = '${sushiMaker.address}'
  
  `)
  // console.log(`

  // const ROUTER_ADDRESS = '${router.address}'
  // const SUSHI_BAR_ADDRESS = '${SushiBar.address}'
  // const FACTORY_ADDRESS = '${FACTORY_ADDRESS}'
  // const MASTERCHEF_ADDRESS = '${masterChef.address}'
  // const WETH_ADDRESS = '${WETH_ADDRESS}'
  // const TKA_ADDRESS = '${TOKEN_A}'
  // const TKB_ADDRESS = '${TOKEN_B}'
  // const ROUTER_ADDRESS = '${router.address}'
  // const SUSHI_ADDRESS = '${sushiToken.address}'

  // const POOL_UNLOCKER_LMD = '${poolUnlockerLMD.address}'

  // const FARM_UNLOCKER_LMN_LMD = '${farmUnlockerLMNLMD.address}'
  // const FARM_UNLOCKER_LMN_EWT = '${farmUnlockerLMNEWT.address}'
  // const FARM_UNLOCKER_LMD_EWT = '${farmUnlockerLMDEWT.address}'

  // const FEE_ADDRESS = '${addresses[9]}'

  // `)

  //! END: ADD a CONTRACT ADD --> receives profits (and Diversifies the profit%)

  //   await factory.setFeeTo(sushiMaker.address) //? If not Processor --> sushiMaker.address

  //! START: Migration CarbonSwap to Lemonade
  // await deployer.deploy(
  //   Migrator,
  //   masterChef.address,
  //   '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  //   factory.address,
  //   1,
  // )
  //! END: Migration CarbonSwap to Lemonade
}
