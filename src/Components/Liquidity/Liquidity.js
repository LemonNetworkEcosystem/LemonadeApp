import React, { useState } from 'react'
import Top from '../Top/Top'
import './Liquidity.scss'
import Liq from '../../assets/exc-liquidity.svg'
import logo from '../../assets/lemonade-logo.svg'
import Set from '../../assets/exchange-set.svg'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
const Liquidity = () => {
  const [modalIsOpen3, setIsOpen3] = useState(false)
  const [Slippage, setSlippage] = useState('Auto')
  const [SlippageRaw, setSlippageRaw] = useState()
  function closeModalSet() {
    setIsOpen3(false)
  }

  const handleSlippageChange = (e) => {
    setSlippageRaw(e.target.value)
    setSlippage(SlippageRaw)
  }
  return (
    <div className="liquidity-page">
      <Modal
        isOpen={modalIsOpen3}
        onRequestClose={closeModalSet}
        contentLabel="Example Modal"
        className="set-modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
        <div className="modal-head">
          <div className="modal-title">
            <h4>Transaction Settings</h4>
          </div>
          <span>Slippage Tolerance</span>
          <div className="slippage">
            <button
              style={{
                background:
                  Slippage === 'Auto'
                    ? 'linear-gradient( 90deg, rgba(216, 223, 0, 1) 0%, rgba(96, 223, 0, 1) 100%)'
                    : '',
              }}
              onClick={() => setSlippage('Auto')}
            >
              Auto
            </button>
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                placeholder="2.0"
                onChange={handleSlippageChange}
              />
              <span>%</span>
            </div>
          </div>
          <span>Transaction Deadline</span>
          <div className="transaction-deadline">
            <input type="number" /> <span>minutes</span>
          </div>
        </div>
      </Modal>
      <Top title="Liquidity" />
      <div className="liquidity-main">
        <div className="liquidity-box">
          <div className="liquidity-box-top">
            <span> Add liquidity to receive LP tokens </span>{' '}
            <img src={Set} onClick={() => setIsOpen3(true)} />
          </div>
          <h2> Liquidity </h2>
          <div className="liquidity-box-btns">
            <Link to={'/liquidity-add'} style={{ textDecoration: 'none' }}>
              <div className="add-liquidity-btn">
                <button>
                  <div> Add Liquidity </div>
                </button>
              </div>
            </Link>
            <Link to={'/liquidity-remove'} style={{ textDecoration: 'none' }}>
              <div className="remove-liquidity-btn">
                <button>
                  <div> Remove Liquidity </div>
                </button>
              </div>
            </Link>
          </div>
          <div className="liquidity-below-btn">
            <span> Your Liquidity </span> <img src={Liq} alt="" />
          </div>
          <span className="liquidity-green-box">
            <img src={logo} alt="" /> 667.23
          </span>
          <p>
            Don 't see a pool you joined? <Link to={'/import'}>Import it</Link>{' '}
            <br /> Or, if you staked your LP tokens in a farm, unstake them to
            see them here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Liquidity
