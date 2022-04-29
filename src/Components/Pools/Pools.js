import React, { useState, useEffect } from 'react'
import Top from '../Top/Top'
import './Pools.scss'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import Pool from './Pool'
import LMN from '../../assets/lemon-logo.png'
import LMD from '../../assets/lemonade.svg'
import EWT from '../../assets/EWT.svg'
import EWD from '../../assets/EWD.png'
import SUSU from '../../assets/susu.png'

import Web3 from 'web3'

import PoolUnlockerLMD from '../../abis/PoolUnlockerLMD.json'
import testingData from '../../utils/hardCoded'
import tokenABI from '../../utils/Utils'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Pools = () => {
  const [active, setActive] = useState(true)
  const [IsFlippedAll, setIsFlippedAll] = useState(false)

  const [Load, setLoad] = useState(true) // you can replace this with the state you have

  const [pool0Flipped, setPool0Flipped] = useState()

  const [token0, setToken0] = useState()

  const [lmdBalance, setLmdBalance] = useState()

  const handleFlipAll = () => {
    setIsFlippedAll(!IsFlippedAll)
  }

  const handleToast = () => {
    toast.success('Deposit Success', {
      position: 'top-right',
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleErrorToast = () => {
    toast.error('Deposit Reverted', {
      position: 'top-right',
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

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

          const unlock_contract = new web3.eth.Contract(
            PoolUnlockerLMD.abi,
            testingData.poolUnlock.LMD.address,
          )

          const unlocked = await unlock_contract.methods
            .unlockList(accounts[0])
            .call({ from: accounts[0] })

          const tokenLMD = new web3.eth.Contract(
            tokenABI,
            testingData.tokens.LMD.address,
          )

          const lmd_balance = await tokenLMD.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] })

          setLmdBalance(web3.utils.fromWei(lmd_balance))

          if (unlocked === true) {
            //? User has pool unlocked
            setPool0Flipped(true)
            setLoad(false)
          } else {
            setPool0Flipped(false)
            setLoad(false)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(async () => {
    setToken0(testingData.tokens.LMD.address)
    await getBlockData()
  }, [])

  return (
    <div className="pools-page">
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
      <Top title="Pools" />
      <p className="title-p">
        Stake ERC-20 tokens and get Lemonade. <br /> You can un-stake at any
        time. Rewards are calculated per block.
      </p>
      <div className="pools-main">
        <div className="pools-filters">
          <div className="stake-filter">
            <span>Discover All</span>
            <Toggle className="stake-toggle" icons={false} />
          </div>
          <div onClick={(e) => setActive(!active)} className="state-filter">
            <span
              style={{
                backgroundColor: active ? '#60DF00' : 'transparent',
                color: active ? '#FFFFFF' : '#959595',
              }}
            >
              Active
            </span>
            <span
              style={{
                backgroundColor: active ? 'transparent' : '#60DF00',
                color: active ? '#959595' : '#FFFFFF',
              }}
            >
              Inactive
            </span>
          </div>
        </div>
        <div className="horizontal-line"></div>
      </div>
      {!active ? (
        Load ? (
          <div
            style={{ display: 'flex', height: '68vh', alignItems: 'center' }}
          >
            <div class="loader">
              <div class="outer"></div>
              <div class="middle"></div>
              <div class="inner"></div>
            </div>
          </div>
        ) : (
          <div className="pools-container"></div>
        )
      ) : Load ? (
        <div style={{ display: 'flex', height: '68vh', alignItems: 'center' }}>
          <div class="loader">
            <div class="outer"></div>
            <div class="middle"></div>
            <div class="inner"></div>
          </div>
        </div>
      ) : (
        <div className="pools-container">
          <Pool
            coinImage={LMD}
            coinName={'LMD'}
            handleFlipAll={handleFlipAll}
            IsFlippedAll={IsFlippedAll}
            isFlipped={pool0Flipped}
            setIsFlipped={setPool0Flipped}
            token0={token0}
            balance={lmdBalance}
            setBalance={setLmdBalance}
            depositSuccess={handleToast}
            depositError={handleErrorToast}
          />
          {/* <Pool
             coinImage={LMD}
            coinName={'LMD'}
            handleFlipAll={handleFlipAll}
            IsFlippedAll={IsFlippedAll}
            isFlipped={pool0Flipped}
            setIsFlipped={setPool0Flipped}
            token0={}
            token1={}
            />
            <Pool
              coinImage={EWT}
              coinName={'EWT'}
              handleFlipAll={handleFlipAll}
              IsFlippedAll={IsFlippedAll}
            /> */}
        </div>
      )}
    </div>
  )
}

export default Pools
