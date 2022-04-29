import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './AddSuccess.scss'
import arrow from '../../assets/arrow-up.svg'

// import warning from '../../assets/warning.svg'

import Web3 from 'web3'
import testingData from '../../utils/hardCoded'
import metamask from '../../assets/metamask-logo.svg'

import Factory from '../../abis/UniswapV2Factory.json'

const AddSuccess = ({
  setIsOpen,
  modalIsOpen,
  state,
  setState,
  coin,
  coin2,
  txHash,
  error,
  exchange,
}) => {
  function closeModal(options) {
    setState(0)
    setIsOpen(false)
  }

  let url = `https://explorer.energyweb.org/tx/${txHash}/internal-transactions`

  const addTokenToMetaMask = async () => {
    const web3 = new Web3(window.ethereum)

    const netId = await web3.eth.net.getId()

    const accounts = await web3.eth.getAccounts()

    const tokenAddress = coin2.address
    const tokenSymbol = coin2.name
    const tokenDecimals = 18
    const tokenImage = coin2.img

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

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 5000)
  //   })

  const reset = () => {
    setState(0)
    setIsOpen(false)
  }

  //   const approve = async (_address) => {
  //     window.ethereum.on('accountsChanged', function (accounts) {
  //       window.location.reload()
  //     })
  //     if (typeof window.ethereum !== 'undefined') {
  //       const web3 = new Web3(window.ethereum)
  //       try {
  //         window.ethereum.enable().then(async function () {
  //           // User has allowed account access to DApp...
  //           const netId = await web3.eth.net.getId()

  //           const accounts = await web3.eth.getAccounts()
  //           const gas = new web3.utils.BN('6000000')

  //           const token = new web3.eth.Contract(tokenABI, _address)

  //           await token.methods
  //             .approve(
  //               testingData.swap.router.address,
  //               web3.utils
  //                 .toBN(2)
  //                 .pow(web3.utils.toBN(256))
  //                 .sub(web3.utils.toBN(1)),
  //             )
  //             .send({
  //               from: accounts[0],
  //               gas: gas,
  //             })

  //           if (_address === Coin.address) {
  //             setAllowed0(true)
  //           } else if (_address === Coin2.address) {
  //             setAllowed1(true)
  //           }
  //         })
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   }

  if (exchange) {
    return (
      <div>
        <Modal isOpen={modalIsOpen} className="modal-success">
          <span className="modal-close" onClick={() => reset()}>
            X
          </span>
          {state === 0 ? (
            <div class="loader">
              <div class="outer"></div>
              <div class="middle">
                <img
                  src={coin.img}
                  style={{ width: '155px', height: '155px' }}
                ></img>
              </div>
              <div class="inner">
                <img
                  src={coin2.img}
                  style={{ width: '155px', height: '155px' }}
                ></img>
              </div>

              <span className="submitted-text">Swap in Progress</span>
            </div>
          ) : state === 1 ? (
            <div className="modal-top-success">
              <div className="circle"></div>
              <img className="arrow" src={arrow} alt="" />
              <span className="submitted-text">Transaction Success</span>
              <a
                href={`https://explorer.energyweb.org/tx/${txHash}/token-transfers`}
                target="_blank"
              >
                View on Explorer
              </a>

              {coin2.address === testingData.tokens.WETH.address ? (
                <div className="modal-top-success">
                  <button onClick={() => reset()}>
                    You have your {coin2.name} on your Metamask{' '}
                  </button>
                  <br></br>
                  <span>
                    <img
                      src={coin2.img}
                      style={{ width: '40px', height: '40px' }}
                      alt=""
                    />
                    <img
                      src={metamask}
                      style={{ width: '40px', height: '40px' }}
                      alt=""
                    />
                  </span>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    await addTokenToMetaMask()
                  }}
                >
                  Add {coin2.name}
                  {/* <img
                src={coin2.img}
                style={{ width: '20px', height: '20px', margin: '10px' }}
                alt=""
              /> */}{' '}
                  to Metamask{' '}
                  <img
                    src={metamask}
                    style={{ width: '40px', height: '40px' }}
                    alt=""
                  />
                </button>
              )}
            </div>
          ) : (
            <div className="modal-top-error">
              {/* <img src={warning} alt="" /> */}
              <a href={url} target="_blank">
                <p>Transaction rejected</p>
                <span>
                  {txHash.substring(0, 14)}
                  <br />
                  {txHash.substring(14, 28)}
                  <br />
                  {txHash.substring(28, 42)}
                </span>
              </a>
              <button onClick={() => reset()}>Dismiss</button>
            </div>
          )}
        </Modal>
      </div>
    )
  } else {
    return (
      <div>
        <Modal isOpen={modalIsOpen} className="modal-success">
          <span className="modal-close" onClick={() => reset()}>
            X
          </span>
          {state === 0 ? (
            <div class="loader">
              <div class="outer"></div>
              <div class="middle">
                <img
                  src={coin.img}
                  style={{ width: '155px', height: '155px' }}
                ></img>
              </div>
              <div class="inner">
                <img
                  src={coin2.img}
                  style={{ width: '155px', height: '155px' }}
                ></img>
              </div>

              <span className="submitted-text">Adding Liquidity</span>
            </div>
          ) : state === 1 ? (
            <div className="modal-top-success">
              <div className="circle"></div>
              <img className="arrow" src={arrow} alt="" />
              <span className="submitted-text">Transaction Submitted</span>
              <a href={url} target="_blank">
                View on Explorer
              </a>
              <button
                onClick={async () => {
                  await addTokenToMetaMask()
                }}
              >
                Add {coin2.name}
                {/* <img
					src={coin2.img}
					style={{ width: '20px', height: '20px', margin: '10px' }}
					alt=""
				  /> */}{' '}
                to Metamask{' '}
                <img
                  src={metamask}
                  style={{ width: '40px', height: '40px' }}
                  alt=""
                />
              </button>
              )
            </div>
          ) : (
            <div className="modal-top-error">
              {/* <img src={warning} alt="" /> */}
              <a href={url} target="_blank">
                <p>Transaction rejected</p>
                <span>
                  {txHash.substring(0, 14)}
                  <br />
                  {txHash.substring(14, 28)}
                  <br />
                  {txHash.substring(28, 42)}
                </span>
              </a>
              <button onClick={() => reset()}>Dismiss</button>
            </div>
          )}
        </Modal>
      </div>
    )
  }
}

export default AddSuccess
