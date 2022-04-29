import React, { useState } from 'react'
import True from '../../assets/true.svg'
import { Link } from 'react-router-dom'
import ReactCardFlip from 'react-card-flip'
import Lemonade3D1 from '../../assets/lemonade3D1.png'
import Lemonade3D2 from '../../assets/lemonade3D2.png'
const Farm = (props) => {
  const [IsFlippedIndivitual, setIsFlippedIndivitual] = useState(false)
  return (
    <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal">
      <div className="back">
        {' '}
        <div className="wrap">
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
          <img src={Lemonade3D2} alt="" className="logo" />
          <img src={Lemonade3D1} alt="" className="logo" />
        </div>{' '}
        <button onClick={() => props.unlock()} className="back-unlock">
          Unlock
        </button>
      </div>
      <div className="farm-box">
        <div className="farm-box-top">
          <div className="farm-top-info">
            <div className="coin-icon">
              <img src={props.firstCoinImg} alt="" />
              <img src={props.secondCoinImg} alt="" />
            </div>
            <div className="coin-name">
              <span> {props.firstCoinName} </span>{' '}
              <span> {props.secondCoinName} </span>
            </div>
          </div>
          <img className="true-logo" src={True} alt="" />
        </div>
        <div className="farm-box-mid">
          <div className="lmd-info">
            <span> Earned </span> <span> LMD </span>
          </div>
          <div className="info">
            <span>
              {' '}
              {props.firstCoinName} - {props.secondCoinName} staked{' '}
            </span>{' '}
            <span> {props.stakedAmount} </span>
          </div>
        </div>
        <div className="farm-box-bot">
          <div className="farm-box-bot-top">
            {props.stakedAmount !== '0' ? (
              <div className="info-earned">
                <span> Pdt. Rewards </span> <span>{props.rewards}</span>
              </div>
            ) : (
              <div className="info-earned">
                <span> Est. APY </span> <span> 90.47 % </span>
              </div>
            )}
            {/* <button> Harvest </button> */}
          </div>
        </div>

        {props.approved ? (
          <div>
            <div className="farm-input">
              <input
                type="number"
                value={props.inputValue}
                placeholder="00.00"
                onChange={(e) => {
                  props.setValue(e.target.value)
                }}
              />
              <button onClick={() => props.getMax()}>Max</button>
            </div>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#959595',
                alignSelf: 'flex-end',
              }}
            >
              Balance:{' '}
              <font color="#444444">
                {parseFloat(props.balance).toFixed(8)}
              </font>
            </span>
            <button
              style={{ display: props.approved ? 'flex' : 'none' }}
              className="deposit-btn"
              onClick={() => {
                props.deposit()
              }}
            >
              Deposit
            </button>
            <br></br>

            <div
              style={{
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <button
                style={{ display: props.approved ? 'flex' : 'none' }}
                className="withdraw-btn"
                onClick={() => {
                  props.withdraw()
                }}
              >
                Withdraw
              </button>
              <button
                style={{ display: props.approved ? 'flex' : 'none' }}
                className="withdraw-all"
                onClick={() => {
                  props.withdrawAll()
                }}
              >
                Withdraw ALL
              </button>
            </div>
          </div>
        ) : (
          <button className="approve-btn" onClick={() => props.approve()}>
            Approve{' '}
            <div className="coin-icon">
              <img src={props.firstCoinImg} alt="" />
              <img src={props.secondCoinImg} alt="" />
            </div>
          </button>
        )}

        <Link to={'/wallet-select'} style={{ textDecoration: 'none' }}>
          <div className="farm-btn">
            <button>
              <div> Connect to Wallet </div>
            </button>
          </div>
        </Link>
      </div>
    </ReactCardFlip>
  )
}

export default Farm
