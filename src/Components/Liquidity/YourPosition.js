import { React, useState, useEffect } from 'react'
import logo from '../../assets/lemonade-logo.svg'

import Web3 from 'web3'
import Factory from '../../abis/UniswapV2Factory.json'
import Pair from '../../abis/UniswapV2Pair.json'
import tokenABI from '../../utils/Utils'
import testingData from '../../utils/hardCoded'

const YourPosition = (props) => {
  const [balanceLP, setBalanceLP] = useState(0)
  const [poolShare, setPoolShare] = useState(0)

  const [amountOut0, setAmountOut0] = useState(0)
  const [amountOut1, setAmountOut1] = useState(0)

  const [reveal, setReveal] = useState(false)

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

          const accounts = await web3.eth.getAccounts()

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address,
          )

          const pair_address = await factory.methods
            .getPair(props.coinAdd, props.coinAdd2)
            .call({ from: accounts[0] })

          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address)

          const balance_lp = await pair_contract.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] })

          setBalanceLP(web3.utils.fromWei(balance_lp))

          const totalSupply = await pair_contract.methods
            .totalSupply()
            .call({ from: accounts[0] })

          const ts = web3.utils.fromWei(totalSupply)
          console.log(balanceLP / ts)
          setPoolShare(((balanceLP / ts) * 100).toFixed(3))

          //token0
          const token0 = new web3.eth.Contract(tokenABI, props.coinAdd)
          let balanceTK0Pair = await token0.methods
            .balanceOf(pair_address)
            .call({
              from: accounts[0],
            })
          balanceTK0Pair = web3.utils.fromWei(balanceTK0Pair)
          //token1
          const token1 = new web3.eth.Contract(tokenABI, props.coinAdd2)
          let balanceTK1Pair = await token1.methods
            .balanceOf(pair_address)
            .call({
              from: accounts[0],
            })

          balanceTK1Pair = web3.utils.fromWei(balanceTK1Pair)

          const amountOut0 = (balanceLP / ts) * balanceTK0Pair
          const amountOut1 = (balanceLP / ts) * balanceTK1Pair

          setAmountOut0(amountOut0)
          setAmountOut1(amountOut1)
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
  useEffect(async () => {
    await getBlockData()
  }, [])

  return (
    <div className="position">
      <div className="position-box">
        <h3>Your Position</h3>
        <div className="position-infos">
          <div className="position-tokens">
            <div className="tokens">
              <img src={props.coinImg} alt="" />
              <img src={props.coinImg2} alt="" />
              <span>
                {props.coinName} - {props.coinName2}
              </span>
            </div>
            <span>{parseFloat(balanceLP).toFixed(5)}</span>
          </div>
          {!reveal ? (
            <div>
              <button
                className="approve-btn"
                onClick={async () => {
                  await getBlockData()
                  setReveal(!reveal)
                }}
                style={{
                  width: '200px',
                  margin: 'auto',
                  marginBottom: '20px',
                  outline: 'none',
                  border: 'none ',
                  borderRadius: '25px',
                  backgroundColor: '#f5f5f5',
                  color: '#444f44',
                  width: '300px',
                  padding: '10px 0px',
                  fontSize: '32px',
                  boxShadow: '2px 2px 18px #60df00',
                }}
              >
                <div> Reveal Ratio </div>
              </button>
            </div>
          ) : (
            <div>
              {' '}
              <div className="position-info">
                <span>Your Pool Share</span>
                <span>{poolShare}%</span>
              </div>
              <div className="position-info">
                <span>{props.coinName}</span>
                <span>
                  {parseFloat(amountOut0).toFixed(4)} {props.coinName}
                </span>
              </div>
              <div className="position-info">
                <span>{props.coinName2}</span>
                <span>
                  {parseFloat(amountOut1).toFixed(4)} {props.coinName2}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourPosition
