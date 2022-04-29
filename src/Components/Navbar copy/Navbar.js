import React, { useState } from 'react'
import './Navbar.scss'
import logo from '../../assets/Lemonade-logo.png'
import { Link, useLocation } from 'react-router-dom'
//findUs
import info from '../../assets/info.svg'
import github from '../../assets/github.png'
import facebook from '../../assets/facebook.png'
import google from '../../assets/google.png'
import twitter from '../../assets/twitter.png'
import youtube from '../../assets/youtube.png'

const NavbarFull = () => {
  const [barClass, setBarClass] = useState('navbar')
  const [NavClass, setNavClass] = useState('')
  const [itemStyle, setItemStyle] = useState('hb-line')
  const [itemStyle2, setItemStyle2] = useState('hb-line2')
  const [show, setShow] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  const winWidth = window.innerWidth

  const handleClick = () => {
    setShow(!show)
    if (show) {
      setNavClass('little-nav')
      setItemStyle('hb-line clicked')
      setItemStyle2('hb-line2 clicked')
      setBarClass('navbar close')
    } else {
      setNavClass('')
      setItemStyle('hb-line')
      setItemStyle2('hb-line2')
      setBarClass('navbar')
    }
  }

  return (
    <div className="navbar-full-container">
      <div className={barClass}>
        <Link style={{ alignSelf: 'flex-end', marginRight: '20px' }} to={'/'}>
          <div onClick={handleClick} className={itemStyle}>
            <img className="nav-logo" src={logo} alt="" />
            <div className="line-container">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </Link>

        <div onClick={handleClick} className={itemStyle2}>
          <img className="nav-logo" src={logo} alt="" />
          <div className="line-container">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        <nav>
          <Link style={{ textDecoration: 'none', color: 'green' }} to={'/'}>
            <div className="nav-item dashboard">
              <span className={NavClass}>Dashboard</span>
            </div>
          </Link>

          <Link style={{ textDecoration: 'none' }} to={'/exchange'}>
            <div className="nav-item exchange">
              <span className={NavClass}>Exchange</span>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/liquidity'}>
            <div className="nav-item liquidity">
              <span className={NavClass}>Liquidity</span>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/pools'}>
            <div className="nav-item pool">
              <span className={NavClass}>Pools</span>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/farms'}>
            <div className="nav-item farms">
              <span className={NavClass}>Farms</span>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/win'}>
            <div className="nav-item win">
              <span className={NavClass}>Win</span>
            </div>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={'/market-place'}>
            <div className="nav-item lemon">
              <span className={NavClass}>Market Place</span>
            </div>
          </Link>
        </nav>
        <span
          className={NavClass}
          style={{ fontWeight: 'bold', color: '#444444', marginRight: '90px' }}
        >
          LMN Price $10.00
        </span>
        <div className="find-us">
          <a className={NavClass} href="">
            <img src={info} alt="" />
          </a>
          <a className={NavClass} href="">
            <img src={github} alt="" />
          </a>
          <a className={NavClass} href="">
            <img src={facebook} alt="" />
          </a>
          <a className={NavClass} href="">
            <img src={google} alt="" />
          </a>
          <a className={NavClass} href="">
            <img src={twitter} alt="" />
          </a>
          <a className={NavClass} href="">
            <img src={youtube} alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavbarFull
