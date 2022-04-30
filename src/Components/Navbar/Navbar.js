import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import logo from "../../assets/Lemonade-logo.png";
import { Link, useLocation } from "react-router-dom";
//findUs
import info from "../../assets/info.svg";
import github from "../../assets/github.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import twitter from "../../assets/twitter.png";
import youtube from "../../assets/youtube.png";
import telegram from "../../assets/telegram.svg";
import Web3 from "web3";
import Factory from "../../abis/UniswapV2Factory.json";
import Pair from "../../abis/UniswapV2Pair.json";
import testingData from "../../utils/hardCoded";

const Navbar = () => {
  const [barClass, setBarClass] = useState("navbar");
  const [NavClass, setNavClass] = useState("");
  const [itemStyle, setItemStyle] = useState("hb-line");
  const [itemStyle2, setItemStyle2] = useState("hb-line2");
  const [show, setShow] = useState(false);

  const [lmdPrice, setLmdPrice] = useState("99.99");

  const location = useLocation();
  const currentPath = location.pathname;
  const winWidth = window.innerWidth;

  const handleClick = () => {
    setShow(!show);
    if (show) {
      setNavClass("little-nav");
      setItemStyle("hb-line clicked");
      setItemStyle2("hb-line2 clicked");
      setBarClass("navbar close");
    } else {
      setNavClass("");
      setItemStyle("hb-line");
      setItemStyle2("hb-line2");
      setBarClass("navbar");
    }
  };

  const getBlockData = async () => {
    const web3 = new Web3(window.ethereum);
    // User has allowed account access to DApp...
    const netId = await web3.eth.net.getId();

    const accounts = await web3.eth.getAccounts();

    const factory = new web3.eth.Contract(
      Factory.abi,
      testingData.swap.factory.address
    );

    const pair_address = await factory.methods
      .getPair(testingData.tokens.LMD.address, testingData.tokens.USDT.address)
      .call({ from: accounts[0] });

    const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);
    const token0 = await pair_contract.methods
      .token0()
      .call({ from: accounts[0] });

    const info = await pair_contract.methods
      .getReserves()
      .call({ from: accounts[0] });

    const r0 = web3.utils.fromWei(info._reserve0);
    const r1 = web3.utils.fromWei(info._reserve1);
    const for1howmuch0 = r0 / r1;
    const for0howmuch1 = r1 / r0;

    token0 === testingData.tokens.LMD.address
      ? console.log("LMD")
      : console.log("EWT");
    console.log(for1howmuch0);
    console.log(for0howmuch1);

    if (info.token0 === testingData.tokens.LMD.address) {
      setLmdPrice(for1howmuch0.toFixed(5));
    } else {
      setLmdPrice(for0howmuch1.toFixed(5));
    }

    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  return (
    <div className="navbar-container">
      <div className={barClass}>
        <Link style={{ alignSelf: "flex-end", marginRight: "20px" }} to={"/"}>
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
          <Link style={{ textDecoration: "none", color: "green" }} to={"/"}>
            <div className="nav-item dashboard">
              <span className={NavClass}>Dashboard</span>
            </div>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/exchange"}>
            <div className="nav-item exchange">
              <span className={NavClass}>Exchange</span>
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/liquidity"}>
            <div className="nav-item liquidity">
              <span className={NavClass}>Liquidity</span>
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/pools"}>
            <div className="nav-item pool">
              <span className={NavClass}>Pools</span>
            </div>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/farms"}>
            <div className="nav-item farms">
              <span className={NavClass}>Farms</span>
            </div>
          </Link>
          {/* <Link style={{ textDecoration: 'none' }} to={'/win'}>
            <div className="nav-item win">
              <span className={NavClass}>Win</span>
            </div>
          </Link> */}
          {/* <Link style={{ textDecoration: 'none' }} to={'/market-place'}>
            <div className="nav-item lemon">
              <span className={NavClass}>Market Place</span>
            </div>
          </Link> */}
        </nav>
        <span
          className={NavClass}
          style={{ fontWeight: "bold", color: "#444444", marginRight: "120px" }}
        >
          LMD Price <br></br>
          <i>$ {lmdPrice}</i>
        </span>
        <div className="find-us">
          <a
            className={NavClass}
            targer="_blank"
            href="https://medium.com/@lmn_network"
          >
            <img src={info} alt="" />
          </a>
          <a
            className={NavClass}
            targer="_blank"
            href="https://github.com/LemonNetwork"
          >
            <img src={github} alt="" />
          </a>
          <a
            className={NavClass}
            targer="_blank"
            href="https://twitter.com/LMN_Network"
          >
            <img src={twitter} alt="" />
          </a>
          <a
            className={NavClass}
            targer="_blank"
            href="https://www.youtube.com/channel/UCJO29RJIde4IJCd6psbagdw"
          >
            <img src={youtube} alt="" />
          </a>
          <a
            className={NavClass}
            targer="_blank"
            href="https://t.me/lemonnetworken"
          >
            <img style={{ width: "28px" }} src={telegram} alt="" />
          </a>
        </div>
        <div className="nav-bg"></div>
      </div>
    </div>
  );
};

export default Navbar;
