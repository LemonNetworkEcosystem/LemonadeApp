import React, { useState, useEffect } from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import Exchange from './Components/Exchange/Exchange'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Liquidity from './Components/Liquidity/Liquidity'
import WalletSelect from './Components/WalletSelect/WalletSelect'
import LiquidityAdd from './Components/Liquidity/LiquidityAdd'
import LiquidityRemove from './Components/Liquidity/LiquidityRemove'
import Pools from './Components/Pools/Pools'
import Farms from './Components/Farms/Farms'
import Win from './Components/Win/Win'
import MarketPlace from './Components/MarketPlace/MarketPlace'
import CreateNFT from './Components/MarketPlace/CreateNFT/CreateNFT'
import UploadNFT from './Components/MarketPlace/CreateNFT/UploadNFT'
import PoolImport from './Components/PoolImport/PoolImport'
import { CoinProvider } from './CoinContext'
import NavbarFull from './Components/Navbar copy/Navbar'
import Lemonade3D1 from './assets/lemonade3D1.png'
import Lemonade3D2 from './assets/lemonade3D2.png'
import './Loader.scss'
function App() {
  const winWidth = window.innerWidth
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  return (
    <React.Fragment>
      {Loading ? (
        <div className="loader-container">
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
          </div>{' '}
          <div class="loader">
            <div class="outer"></div>
            <div class="middle"></div>
            <div class="inner"></div>
          </div>
        </div>
      ) : (
        <Router>
          <div className="App">
            <CoinProvider>
              <Route path={'/navbar'} component={NavbarFull} />
              <Route path={'/'} component={Navbar} />
              <Route exact path="/" component={Dashboard} />{' '}
              <Route path="/exchange" component={Exchange} />{' '}
              <Route path="/liquidity" component={LiquidityAdd} />{' '}
              <Route path="/wallet-select" component={WalletSelect} />{' '}
              <Route path="/pools" component={Pools} />{' '}
              <Route path="/farms" component={Farms} />{' '}
              <Route path="/win" component={Win} />{' '}
              <Route path="/import" component={PoolImport} />{' '}
              <Route path="/market-place" component={MarketPlace} />{' '}
              <Route path="/create-nft" component={CreateNFT} />{' '}
              <Route path="/upload-nft" component={UploadNFT} />{' '}
            </CoinProvider>
          </div>{' '}
        </Router>
      )}
    </React.Fragment>
  )
}

export default App
