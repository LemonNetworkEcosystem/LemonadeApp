import { createContext, useState } from 'react'
import Arrow from './assets/arrow.svg'
import EWT from './assets/EWT.png'
import LMD from './assets/lemonade.svg'

import testingData from './utils/hardCoded'

const CoinContext = createContext()

export function CoinProvider({ children }) {
  const [Coin, setCoin] = useState({
    symbol: 'EWT',
    name: 'EWT',
    img: EWT,
    address: testingData.tokens.WETH.address,
  })
  const [Coin2, setCoin2] = useState({
    symbol: 'LMD',
    name: 'LMD',
    img: testingData.tokens.LMD.img,
    address: testingData.tokens.LMD.address,
  })
  return (
    <CoinContext.Provider
      value={{
        Coin,
        Coin2,
        setCoin,
        setCoin2,
      }}
    >
      {children}{' '}
    </CoinContext.Provider>
  )
}

export default CoinContext
