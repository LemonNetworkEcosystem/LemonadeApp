import React, { useState } from 'react'
import Select from 'react-select'
import Modal from 'react-modal'
import Arrow from '../../assets/arrow.svg'
import Transfer from '../../assets/transfer.svg'
import EWT from '../../assets/EWT.png'
import LMN from '../../assets/lemon-logo.png'
import LMD from '../../assets/lemonade.svg'
import USDT from '../../assets/usdt.svg'
import SUSU from '../../assets/susu.png'
import testingData from '../../utils/hardCoded'
import './SelectModal.scss'
const SelectModal = ({
  setcoin,
  coin,
  setIsOpen,
  modalIsOpen,
  oppositeCoin,
  setValue_0,
  setValue_1,
  setAmountOutMin,
}) => {
  const [inputValue, setInputValue] = useState('')

  function closeModal(options) {
    setIsOpen(false)
    setValue_0('')
    setValue_1('')

    setAmountOutMin(0)
    if (options.label != null) {
      setcoin({
        ...coin,
        img: options.image,
        name: options.label.props.children[1].props.children[0].props.children,
        address: options.address,
      })
    } else {
      //! Get token Blockchain Data
      console.log(options.value)
    }
  }

  const tokens = Object.values(testingData.tokens)

  const options = tokens.map((token) => ({
    value: token.symbol,
    image: token.img,
    address: token.address,
    label: (
      <div
        style={{
          display: token.symbol === oppositeCoin.name ? 'none' : 'flex',
          alignItems: 'center',
        }}
      >
        <img src={token.img} style={{ width: '48px', marginRight: '10px' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ marginBottom: '-20px', marginTop: '0px' }}>
            {token.symbol}
          </h4>
          <h5 style={{ marginBottom: '0px' }}>{token.name}</h5>
        </div>
      </div>
    ),
  }))

  const customTheme = (theme) => {
    return {
      ...theme,
      borderRadius: 25,
      colors: {
        ...theme.colors,
        neutral20: '#60DF00',
        primary25: '#f1f1f1',
      },
    }
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      '&:hover': {
        background: 'transparent',
      },
    }),
    valueContainer: (provided, state) => ({
      ...provided,

      background: 'transparent',
    }),
    selectContainer: (provided, state) => ({
      ...provided,

      background: 'red',
    }),
    menu: (provided, state) => ({
      ...provided,
      background: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      height: '650px',
    }),
    menuList: (provided, state) => ({
      ...provided,
      background: 'transparent',
      outline: 'none',
      boxShadow: 'none',
      height: '650px',
      '::-webkit-scrollbar': {
        width: '4px',
        height: '0px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
    input: (provided, state) => ({
      ...provided,
      outline: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      '&:hover': {
        background: '#f1f1f1',
        borderRadius: '25px',
      },
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      display: 'none',
    }),
  }
  return (
    <div>
      {' '}
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Example Modal"
        className="Modal"
      >
        <div className="modal-head">
          <span>Select an ERC-20</span>
          <button onClick={closeModal}>X</button>
        </div>

        <Select
          components={{
            IndicatorSeparator: () => null,
          }}
          options={options}
          theme={customTheme}
          height="24px"
          width="200px"
          menuIsOpen={true}
          onChange={closeModal}
          styles={customStyles}
          placeholder="Search Name"
          // onInputChange={(e) => setInputValue(e.target.value)}
          maxMenuHeight="600px"
        />
      </Modal>
    </div>
  )
}

export default SelectModal
