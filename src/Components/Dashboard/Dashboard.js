import React, { useState, useEffect } from 'react'

import Web3 from 'web3'
import Top from '../Top/Top'
import './Dashboard.scss'
import { Link } from 'react-router-dom'
import { Line, Bar } from 'react-chartjs-2'
import coffer from '../../assets/coffer.svg'
import lemonade from '../../assets/lemon-info.svg'
import pulse from '../../assets/fire-pulse.svg'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import Factory from '../../abis/UniswapV2Factory.json'
import Pair from '../../abis/UniswapV2Pair.json'
import Router from '../../abis/UniswapV2Router02.json'

import tokenABI from '../../utils/Utils'
import testingData from '../../utils/hardCoded'

const Dashboard = () => {
  const [lmnWallet, setLmnWallet] = useState(0)
  const [lmdWallet, setLmdWallet] = useState(0)

  const [lmdPrice, setLmdPrice] = useState(0)
  const [lmnPrice, setLmnPrice] = useState(0)

  const [lmn_totalSupply, setlLmn_totalSupply] = useState(0)
  const [lmd_totalSupply, setlLmd_totalSupply] = useState(0)

  const [tvl, setTvl] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const [tvlDolar, setTvlDolar] = useState(0)

  const [totalLP, setTotalLP] = useState('')

  const getBlockData = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()

          // setConnected(true);

          const accounts = await web3.eth.getAccounts()

          const lmnContract = new web3.eth.Contract(
            tokenABI,
            testingData.tokens.LMN.address,
          )

          // TODO: Remove
          const lmnBal = await lmnContract.methods.balanceOf(accounts[0]).call({
            from: accounts[0],
          })
          setLmnWallet(web3.utils.fromWei(lmnBal))

          const lmdContract = new web3.eth.Contract(
            tokenABI,
            testingData.tokens.LMD.address,
          )
          const lmdBal = await lmdContract.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] })
          setLmdWallet(web3.utils.fromWei(lmdBal.toString()))

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address,
          )

          const router = new web3.eth.Contract(
            Router.abi,
            testingData.swap.router.address,
          )

          const pair_address = await factory.methods
            .getPair(
              testingData.tokens.LMD.address,
              testingData.tokens.USDT.address,
            )
            .call({ from: accounts[0] })

          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address)

          const pair_address_lmn = await factory.methods
            .getPair(
              testingData.tokens.LMN.address,
              testingData.tokens.USDT.address,
            )
            .call({ from: accounts[0] })

          const pair_contract_lmn = new web3.eth.Contract(
            Pair.abi,
            pair_address_lmn,
          )
          const token0 = await pair_contract.methods
            .token0()
            .call({ from: accounts[0] })

          const token1 = await pair_contract_lmn.methods
            .token0()
            .call({ from: accounts[0] })

          const info = await pair_contract.methods
            .getReserves()
            .call({ from: accounts[0] })

          const info1 = await pair_contract_lmn.methods
            .getReserves()
            .call({ from: accounts[0] })

          const r0 = web3.utils.fromWei(info._reserve0)
          const r1 = web3.utils.fromWei(info._reserve1)
          const for1howmuch0 = r0 / r1
          const for0howmuch1 = r1 / r0

          const r01 = web3.utils.fromWei(info1._reserve0)
          const r11 = web3.utils.fromWei(info1._reserve1)
          const for11howmuch00 = r01 / r11
          const for00howmuch11 = r11 / r01

          token0 === testingData.tokens.LMD.address
            ? console.log('LMD')
            : console.log('EWT')
          console.log(for1howmuch0)
          console.log(for0howmuch1)

          if (info.token0 === testingData.tokens.LMD.address) {
            setLmdPrice(for1howmuch0.toFixed(5))
          } else {
            setLmdPrice(for0howmuch1.toFixed(5))
          }

          if (info.token1 === testingData.tokens.LMN.address) {
            setLmnPrice(for11howmuch00.toFixed(5))
          } else {
            setLmnPrice(for00howmuch11.toFixed(5))
          }

          const lmn_contract = new web3.eth.Contract(
            tokenABI,
            testingData.tokens.LMN.address,
          )

          const ts = await lmn_contract.methods
            .totalSupply()
            .call({ from: accounts[0] })

          setlLmn_totalSupply(
            Intl.NumberFormat('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(web3.utils.fromWei(ts)),
          )

          const lmd_contract = new web3.eth.Contract(
            tokenABI,
            testingData.tokens.LMD.address,
          )

          const ts_lmd = await lmd_contract.methods
            .totalSupply()
            .call({ from: accounts[0] })

          setlLmd_totalSupply(
            Intl.NumberFormat('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(web3.utils.fromWei(ts_lmd)),
          )

          const length = await factory.methods
            .allPairsLength()
            .call({ from: accounts[0] })

          console.log(length)
          console.log(length)
          console.log(length)

          // for (let i = 0; i < length; i++) {
          //   const element = array[i]
          // }

          let sumatori = 0
          let sumEthValue = 0

          for (let i = 0; i < length; i++) {
            const pair_address = await factory.methods
              .allPairs(i)
              .call({ from: accounts[0] })
            console.log(pair_address)

            const pair_contract = new web3.eth.Contract(Pair.abi, pair_address)

            const pair_info = await pair_contract.methods
              .getReserves()
              .call({ from: accounts[0] })

            const firstToken = await pair_contract.methods
              .token0()
              .call({ from: accounts[0] })
            const secondToken = await pair_contract.methods
              .token1()
              .call({ from: accounts[0] })

            const exist0 = await factory.methods
              .getPair(firstToken, testingData.tokens.WETH.address)
              .call({ from: accounts[0] })

            const exist1 = await factory.methods
              .getPair(secondToken, testingData.tokens.WETH.address)
              .call({ from: accounts[0] })

            let unitPrice0 = 0
            let unitPrice1 = 0

            let uni0 = 0
            let uni1 = 0

            if (exist0 !== '0x0000000000000000000000000000000000000000') {
              //! check exist/WETH --> getAmountsOut --> result[1] "value" * Reserve0
              unitPrice0 = await router.methods
                .getAmountsOut(web3.utils.toWei('0.1'), [
                  firstToken,
                  testingData.tokens.WETH.address,
                ])
                .call({ from: accounts[0] })
              console.log(unitPrice0[1])
              uni0 = web3.utils.fromWei(unitPrice0[1])
            }

            if (exist1 !== '0x0000000000000000000000000000000000000000') {
              //! check exist/WETH --> getAmountsOut --> result[1] "value" * Reserve1
              unitPrice1 = await router.methods
                .getAmountsOut(web3.utils.toWei('0.1'), [
                  secondToken,
                  testingData.tokens.WETH.address,
                ])
                .call({ from: accounts[0] })
              console.log(unitPrice1[1])
              uni1 = web3.utils.fromWei(unitPrice1[1])
            }

            sumEthValue =
              sumEthValue +
              uni0 * web3.utils.fromWei(pair_info._reserve0) +
              uni1 * web3.utils.fromWei(pair_info._reserve1)

            console.log(sumEthValue)
            //?TTL LPs
            const pair_lps = await pair_contract.methods
              .totalSupply()
              .call({ from: accounts[0] })
            const lpAdd = parseFloat(web3.utils.fromWei(pair_lps))
            sumatori = sumatori + lpAdd
            //?TTL LPs
            // console.log(lpAdd)
            // console.log(sumatori)
          }

          let ethUniPrice = 10
          try {
            const fetchUni = await router.methods
              .getAmountsOut(web3.utils.toWei('0.1'), [
                testingData.tokens.WETH.address,
                testingData.tokens.USDT.address,
              ])
              .call({ from: accounts[0] })

            ethUniPrice = web3.utils.fromWei(fetchUni[1])
          } catch (e) {
            console.log('e: fetchin ethUniPrice')
          }

          const lemonade_tvl = ethUniPrice * sumEthValue
          setTotalValue(lemonade_tvl.toFixed(2))
          setTvl(
            Intl.NumberFormat('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(lemonade_tvl),
          )

          setTotalLP(
            Intl.NumberFormat('en-GB', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(sumatori),
          )

          // const valAdd = await

          //! Fetch All Known Pools & Farms --> TVL
        })
      } catch (e) {
        // User has denied account access to DApp...
      }
    }

    //load contracts
  }

  const addLMN = async () => {
    const tokenAddress = '0xdBB49BE8562ca6E23B41B3BC7f76b00748EED557'
    const tokenSymbol = 'LMN'
    const tokenDecimals = 18
    const tokenImage =
      'https://firebasestorage.googleapis.com/v0/b/lemon-network.appspot.com/o/ICO%2FLMN.png?alt=media&token=8ba6cbfe-63ae-4ede-be18-fa7750068e4c'
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })
      if (wasAdded) {
        console.log('Thanks for your interest!')
      } else {
        console.log('Your loss!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addLMD = async () => {
    const tokenAddress = testingData.tokens.LMD.address
    const tokenSymbol = testingData.tokens.LMD.symbol
    const tokenDecimals = 18
    const tokenImage = testingData.tokens.LMD.img
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      })
      if (wasAdded) {
        console.log('Thanks for your interest!')
      } else {
        console.log('Your loss!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(async () => {
    await getBlockData()
  }, [])

  const winWidth = window.innerWidth
  return (
    <div className="dashboard-page">
      <Top title="Dashboard" />
      <div className="dashboard-main">
        <div className="dashboard-box first-box">
          <div className="dashboard-header">
            <img src={coffer} alt="" />
            <span>My LEMONADE</span>
          </div>
          <div className="dashboard-info-container">
            <div className="dashboard-info">
              <span>LMN in Wallet</span>
              <span>
                {Intl.NumberFormat('en-GB', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(lmnWallet)}
              </span>
            </div>
            <div className="dashboard-info">
              <span>LMD in Wallet</span>
              <span>
                {Intl.NumberFormat('en-GB', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(lmdWallet)}
              </span>
            </div>
          </div>
          {/* <Link to={'/wallet-select'} style={{ textDecoration: 'none' }}> */}
          <div className="dashboard-btn">
            <button
              onClick={async (e) => {
                await addLMN()
              }}
            >
              {winWidth > 1600 ? (
                <div>ADD LMN</div>
              ) : (
                <div style={{ display: 'flex' }}>
                  ADD LMN <img src={pulse} alt="" />
                </div>
              )}
            </button>{' '}
            <font color="white">...</font>{' '}
            <button
              onClick={async (e) => {
                await addLMD()
              }}
            >
              {winWidth > 1600 ? (
                <div>ADD LMD</div>
              ) : (
                <div style={{ display: 'flex' }}>
                  ADD LMD <img src={pulse} alt="" />
                </div>
              )}
            </button>
          </div>
          {/* </Link> */}
        </div>
        <div className="dashboard-box first-box">
          <div className="dashboard-header">
            <img src={lemonade} alt="" />
            <span>LEMONADE INFO</span>
          </div>
          <div className="dashboard-info-container">
            <div className="dashboard-info">
              <span>LMN Price</span>
              <span>${lmnPrice}</span>
            </div>
            <div className="dashboard-info">
              <span>LMN Total Supply</span>
              <span>{lmn_totalSupply}</span>
            </div>
            <div className="dashboard-info">
              <span>Total Value Locked</span>
              <span>${tvl}</span>
            </div>
            <div className="dashboard-info">
              <span>LMD Price</span>
              <span>${lmdPrice}</span>
            </div>
            <div className="dashboard-info">
              <span>LMD Total Supply</span>
              <span>{lmd_totalSupply}</span>
            </div>
            <div className="dashboard-info">
              <span>LMN : LMD Supply Ratio</span>
              <span>
                1 :{' '}
                {(
                  parseFloat(lmn_totalSupply) / parseFloat(lmd_totalSupply)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div style={{ height: '150px' }} className="dashboard-box">
          <div className="dashboard-box-title">
            <span>Total Lemonade Value</span>
            <span>
              ${totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </span>
          </div>
        </div>
        <div style={{ height: '150px' }} className="dashboard-box">
          <div className="dashboard-box-title">
            <span>Total Amount of LLP</span>
            <span>{totalLP} Lemonade LPs</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
