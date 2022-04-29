import React, { useEffect, useState } from 'react'

import Web3 from 'web3'
import Factory from '../../abis/UniswapV2Factory.json'
import Router from '../../abis/UniswapV2Router02.json'

import './AddLiqModal.scss'
import Modal from 'react-modal'
import EWT from '../../assets/EWT.png'
import testingData from '../../utils/hardCoded'

import tokenABI from '../../utils/Utils'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddLiqModal = ({
  modalIsOpen,
  setIsOpen,
  setIsOpenSucc,
  token0,
  coin0,
  token1,
  coin1,
  value_0,
  value_1,
  slippage,
  rate0per1,
  rate1per0,
  sharePool,
  firstTime,
  liquidity,
}) => {
  const handleSuccess = () => {
    setIsOpen(false)
    setIsOpenSucc(true)
  }

  const handleToast = () => {
    toast.success('Liquidity Added Successfully', {
      position: 'top-right',
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleToastError = () => {
    toast.error('Transaction Reverted', {
      position: 'top-right',
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  async function addLiquidity() {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const id = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const gas = new web3.utils.BN('6000000')

          //!!!!! CHECK IF PAIR EXISTS (en base a aixo SURT LA FORMULA)
          const router = new web3.eth.Contract(
            Router.abi,
            testingData.swap.router.address,
          )
          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address,
          )

          const pair_address = await factory.methods
            .getPair(token0, token1)
            .call({ from: accounts[0] })

          if (pair_address === '0x0000000000000000000000000000000000000000') {
            // TODO: ADD Liquidity FIRST TIME
            if (
              token0 === testingData.tokens.WETH.address ||
              token1 === testingData.tokens.WETH.address
            ) {
              try {
                //! Add Liqudity For First Time (ETH)
                await router.methods
                  .addLiquidityETH(
                    token0 === testingData.tokens.WETH.address
                      ? token1
                      : token0,
                    // web3.utils.toWei(
                    //   Math.sqrt(value_0 * value_1 - 1000)
                    //     .toFixed(5)
                    //     .toString(),
                    // ),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei(value_1.toString())
                      : web3.utils.toWei(value_0.toString()),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei((value_1 * slippage).toString())
                      : web3.utils.toWei((value_0 * slippage).toString()),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei((value_0 * slippage).toString())
                      : web3.utils.toWei((value_1 * slippage).toString()),
                    accounts[0],
                    Math.floor(Date.now() / 1000) + 60 * 10,
                  )
                  .send({
                    from: accounts[0],
                    gas: gas,
                    value: web3.utils.toWei(
                      token0 === testingData.tokens.WETH.address
                        ? value_0.toString()
                        : value_1.toString(),
                    ),
                  })
                handleToast()
              } catch (e) {
                handleToastError()
                console.log('ERROR: Adding Liquidity')
                console.log(e)
              }
            } else {
              //! Add Liqudity For First Time (TOKEN)
              try {
                await router.methods
                  .addLiquidity(
                    token0,
                    token1,
                    web3.utils.toWei(value_0.toString()),
                    web3.utils.toWei(value_1.toString()),
                    web3.utils.toWei((value_0 * slippage).toString()),
                    web3.utils.toWei((value_1 * slippage).toString()),
                    accounts[0],
                    Math.floor(Date.now() / 1000) + 60 * 10,
                  )
                  .send({
                    from: accounts[0],
                    gas: gas,
                  })
                handleToast()
              } catch (e) {
                handleToastError()
              }
            }
          } else {
            // TODO: ADD Liquidity but NOT for first time
            if (
              token0 === testingData.tokens.WETH.address ||
              token1 === testingData.tokens.WETH.address
            ) {
              try {
                const result = await router.methods
                  .addLiquidityETH(
                    token0 === testingData.tokens.WETH.address
                      ? token1
                      : token0,
                    // web3.utils.toWei(liquidity.toString()),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei(
                          parseFloat(value_1).toFixed(10).toString(),
                        )
                      : web3.utils.toWei(
                          parseFloat(value_0).toFixed(10).toString(),
                        ),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei(
                          (
                            parseFloat(value_1).toFixed(10) * slippage
                          ).toString(),
                        )
                      : web3.utils.toWei(
                          (
                            parseFloat(value_0).toFixed(10) * slippage
                          ).toString(),
                        ),
                    token0 === testingData.tokens.WETH.address
                      ? web3.utils.toWei(
                          (
                            parseFloat(value_0).toFixed(10) * slippage
                          ).toString(),
                        )
                      : web3.utils.toWei(
                          (
                            parseFloat(value_1).toFixed(10) * slippage
                          ).toString(),
                        ),
                    accounts[0],
                    Math.floor(Date.now() / 1000) + 60 * 10,
                  )
                  .send({
                    from: accounts[0],
                    gas: gas,
                    value: web3.utils.toWei(
                      token0 === testingData.tokens.WETH.address
                        ? parseFloat(value_0).toFixed(10).toString()
                        : parseFloat(value_1).toFixed(10).toString(),
                    ),
                  })
                console.log(result)
                handleToast()
                console.log('COUUUUULD ADD LIQUIDITY')
              } catch (e) {
                handleToastError()
                console.log('ERROR: Adding Liquidity')
                console.log(e)
              }
            } else {
              try {
                await router.methods
                  .addLiquidity(
                    token0,
                    token1,
                    web3.utils.toWei(value_0.toString()),
                    web3.utils.toWei(value_1.toString()),
                    web3.utils.toWei((value_0 * slippage).toString()),
                    web3.utils.toWei((value_1 * slippage).toString()),
                    accounts[0],
                    Math.floor(Date.now() / 1000) + 60 * 10,
                  )
                  .send({
                    from: accounts[0],
                    gas: gas,
                  })
                handleToast()
              } catch (e) {
                console.log(e)
                handleToastError()
              }
            }
          }
        })
      } catch (e) {
        // User has denied account access to DApp...
        console.log('ERROR: Calculate Input 0 f(input 1)')
        handleToastError()
      }
    }
  }
  return (
    <React.Fragment>
      <ToastContainer
        style={{ width: '400px' }}
        position="top-right"
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="modal-container">
        <Modal
          isOpen={modalIsOpen}
          contentLabel="Example Modal"
          className="add-modal"
        >
          <div className="modal-head">
            <p>You will receive</p>
            <span onClick={() => setIsOpen(false)}>x</span>
          </div>
          <div className="modal-amount">
            <div className="modal-amount-top">
              <span>
                {firstTime
                  ? Math.sqrt(value_0 * value_1 - 1000).toFixed(5)
                  : liquidity.toFixed(5)}
              </span>
              <img src={coin0.img} alt="" />
              <img src={coin1.img} alt="" />
            </div>
            <span>
              {coin0.name} - {coin1.name} LLP
            </span>
          </div>
          <div className="warning-text">
            Output is estimated. If the price changes by more than 0.02% your
            transaction will revert.
          </div>
          <div className="modal-stats">
            <div className="deposit-info">
              <span className="title">{coin0.name} Deposited</span>
              <span>
                {value_0} <font color="white">. . . </font>
                <img src={coin0.img} alt="" />
              </span>
            </div>
            <div className="deposit-info">
              <span className="title">{coin1.name} Deposited</span>
              <span>
                {value_1} <font color="white">. . . </font>
                <img src={coin1.img} alt="" />
              </span>
            </div>
            <div className="rates">
              <span className="title">Rates</span>{' '}
              <div className="rates-info">
                <span className="token-rate">
                  1 {coin0.name} = {rate1per0} {coin1.name}
                </span>
                <span className="token-rate">
                  1 {coin1.name} = {rate0per1} {coin0.name}
                </span>
              </div>
            </div>
            <div className="share">
              <span className="title">Share of Pool:</span>
              <span className="share-rate">
                <i>{sharePool}%</i>
              </span>
            </div>
            <div className="exchange-btn">
              {!firstTime ? (
                <button
                  onClick={async () => {
                    await addLiquidity()
                  }}
                >
                  <div>Add Liquidity</div>
                </button>
              ) : value_0 * value_1 >= 1000 ? (
                <button
                  onClick={async () => {
                    await addLiquidity()
                  }}
                >
                  <div>Add Liquidity</div>
                </button>
              ) : (
                <button onClick={() => setIsOpen(false)}>
                  <div>
                    <font color="red">
                      Amount0 * Amount1 <br></br>
                      {'>'} 1,000{' '}
                    </font>
                  </div>
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default AddLiqModal
