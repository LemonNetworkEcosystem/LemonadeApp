import React, { useEffect, useState } from "react";
import Top from "../Top/Top";
import Set from "../../assets/exchange-set.svg";
import Arrow from "../../assets/arrow.svg";
import EWT from "../../assets/EWT.png";
import Transfer from "../../assets/transfer.svg";
import YourPosition from "./YourPosition";
import { Link } from "react-router-dom";
import SelectModal from "../SelectModal/SelectModal";
import CoinContext from "../../CoinContext";
import { useContext } from "react";
import AddLiqModal from "../AddLiqModal/AddLiqModal";
import AddSuccess from "../AddSuccess/AddSuccess";

import LiquidityRemove from "./LiquidityRemove";

import Web3 from "web3";

import Factory from "../../abis/UniswapV2Factory.json";
import Pair from "../../abis/UniswapV2Pair.json";

import testingData from "../../utils/hardCoded";
import tokenABI from "../../utils/Utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LiquidityAdd = (props) => {
  const { setCoin, setCoin2, Coin, Coin2 } = useContext(CoinContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [transfer, setTransfer] = useState(true);

  const [title, setTitle] = useState("Add Liqudity");
  const [balance0, setBalance0] = useState("0");
  const [balance1, setBalance1] = useState("0");
  const [hasLP, setHasLP] = useState(null);

  const [value_0, setValue_0] = useState();
  const [value_1, setValue_1] = useState();

  const [allowed0, setAllowed0] = useState(false);
  const [allowed1, setAllowed1] = useState(false);

  const [ratio0per1, setRatio0per1] = useState(0);
  const [ratio1per0, setRatio1per0] = useState(0);
  const [poolShare, setPoolShare] = useState(0);

  const [pairState, setPairState] = useState("");
  const [slippage, setSlippage] = useState(0.95);

  const [firstTime, setFirstTime] = useState(false);
  const [liquidity, setLiquidity] = useState(0);

  const [removeApprove, setRemoveApprove] = useState(false);

  //FooSetter
  const [amountOutMin, setAmountOutMin] = useState(0);

  function openModal() {
    setIsOpen(true);
  }

  const handleTransfer = (e) => {
    const coTemp = Coin;
    const coTemp2 = Coin2;
    const v0_temp = value_0;
    const v1_temp = value_1;
    setCoin(coTemp2);
    setCoin2(coTemp);
    setValue_0(v1_temp);
    setValue_1(v0_temp);
  };

  const winWidth = window.innerWidth;

  const getBlockData = async () => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );

          const pair = await factory.methods
            .getPair(Coin.address, Coin2.address)
            .call({
              from: accounts[0],
            });

          if (pair === "0x0000000000000000000000000000000000000000") {
            setHasLP(false);
            setTitle("Create Liquidity Pair");
            setFirstTime(true);
            const token0 = new web3.eth.Contract(tokenABI, Coin.address);
            const token1 = new web3.eth.Contract(tokenABI, Coin2.address);

            const allowed0Amount = await token0.methods
              .allowance(accounts[0], testingData.swap.router.address)
              .call({ from: accounts[0] });

            const allowed1Amount = await token1.methods
              .allowance(accounts[0], testingData.swap.router.address)
              .call({ from: accounts[0] });

            if (allowed0Amount === "0") {
              setAllowed0(false);
            } else {
              setAllowed0(true);
            }

            if (allowed1Amount === "0") {
              setAllowed1(false);
            } else {
              setAllowed1(true);
            }
          } else {
            setTitle("Add Liquidity");
            setFirstTime(false);
            const pair_contract = new web3.eth.Contract(Pair.abi, pair);

            const lp_amount = await pair_contract.methods
              .balanceOf(accounts[0])
              .call({
                from: accounts[0],
              });

            if (web3.utils.fromWei(lp_amount) === 0) {
              setHasLP(false);
            } else {
              setHasLP(true);
            }

            const factory_ = new web3.eth.Contract(
              Factory.abi,
              testingData.swap.factory.address
            );

            const pair_address_ = await factory_.methods
              .getPair(Coin.address, Coin2.address)
              .call({ from: accounts[0] });

            const pair_contract_ = new web3.eth.Contract(
              Pair.abi,
              pair_address_
            );

            const allowance_ = await pair_contract_.methods
              .allowance(accounts[0], testingData.swap.router.address)
              .call({ from: accounts[0] });

            if (web3.utils.fromWei(allowance_) !== "0") {
              setRemoveApprove(true);
            }
          }
          setPairState(pair);
          const token0 = new web3.eth.Contract(tokenABI, Coin.address);
          const token1 = new web3.eth.Contract(tokenABI, Coin2.address);

          const allowed0Amount = await token0.methods
            .allowance(accounts[0], testingData.swap.router.address)
            .call({ from: accounts[0] });

          const allowed1Amount = await token1.methods
            .allowance(accounts[0], testingData.swap.router.address)
            .call({ from: accounts[0] });

          if (allowed0Amount === "0") {
            setAllowed0(false);
          } else {
            setAllowed0(true);
          }

          if (allowed1Amount === "0") {
            setAllowed1(false);
          } else {
            setAllowed1(true);
          }

          const balance0 = await token0.methods.balanceOf(accounts[0]).call();
          const balance1 = await token1.methods.balanceOf(accounts[0]).call();

          if (Coin.address === testingData.tokens.WETH.address) {
            const ethBalance = await web3.eth.getBalance(accounts[0]);
            setBalance0(web3.utils.fromWei(ethBalance));
            setBalance1(web3.utils.fromWei(balance1));
          } else if (Coin2.address === testingData.tokens.WETH.address) {
            const ethBalance = await web3.eth.getBalance(accounts[0]);
            setBalance0(web3.utils.fromWei(balance0));
            setBalance1(web3.utils.fromWei(ethBalance));
          } else {
            setBalance0(web3.utils.fromWei(balance0));
            setBalance1(web3.utils.fromWei(balance1));
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const approve = async (_address) => {
    const web3 = new Web3(window.ethereum);
    try {
      // User has allowed account access to DApp...
      const netId = await web3.eth.net.getId();

      const accounts = await web3.eth.getAccounts();
      const gas = new web3.utils.BN("6000000");

      const token = new web3.eth.Contract(tokenABI, _address);
      console.log("AT LEAST TRYING");
      await token.methods
        .approve(
          testingData.swap.router.address,
          web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1))
        )
        .send({
          from: accounts[0],
          // gas: gas,
        });

      if (_address === Coin.address) {
        setAllowed0(true);
      } else if (_address === Coin2.address) {
        setAllowed1(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // TODO: AQUI
  const calculateInput1 = async (_value0) => {
    if (pairState === "0x0000000000000000000000000000000000000000") {
      setRatio0per1(_value0 / value_1);
      setRatio1per0(value_1 / _value0);
      setPoolShare(100);
    } else {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      const factory = new web3.eth.Contract(
        Factory.abi,
        testingData.swap.factory.address
      );

      const pair_address = await factory.methods
        .getPair(Coin.address, Coin2.address)
        .call({ from: accounts[0] });

      const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);
      const totalSupply = await pair_contract.methods.totalSupply().call();
      const ts = web3.utils.fromWei(totalSupply);
      const some = await pair_contract.methods
        .getReserves()
        .call({ from: accounts[0] });

      const r0 = web3.utils.fromWei(some._reserve0);
      const r1 = web3.utils.fromWei(some._reserve1);
      const for1howmuch0 = r0 / r1;
      const for0howmuch1 = r1 / r0;

      setValue_1(_value0 * for0howmuch1);
      setRatio0per1(for0howmuch1.toFixed(4));
      setRatio1per0(for1howmuch0.toFixed(4));

      //! Calculate PoolShare
      //! Calculate expected Liquididity
      const liquidity = Math.min(
        (_value0 * ts) / r0,
        (_value0 * for0howmuch1 * ts) / r1
      );

      console.log(liquidity);
      setLiquidity(liquidity);
      const myShare =
        (parseFloat(liquidity) / (parseFloat(liquidity) + parseFloat(ts))) *
        100;
      setPoolShare(myShare.toFixed(3));
    }
  };
  const calculateInput0 = async (_value1) => {
    if (pairState === "0x0000000000000000000000000000000000000000") {
      setRatio0per1(value_0 / _value1);
      setRatio1per0(_value1 / value_0);
      setPoolShare(100);
    } else {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      //! Fetch Reserves y mirar quan ha de ficar del altre en el VALUE_1
      const factory = new web3.eth.Contract(
        Factory.abi,
        testingData.swap.factory.address
      );

      const pair_address = await factory.methods
        .getPair(Coin.address, Coin2.address)
        .call({ from: accounts[0] });

      const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);
      const totalSupply = await pair_contract.methods.totalSupply().call();
      const ts = web3.utils.fromWei(totalSupply);
      const some = await pair_contract.methods
        .getReserves()
        .call({ from: accounts[0] });

      const r0 = web3.utils.fromWei(some._reserve0);
      const r1 = web3.utils.fromWei(some._reserve1);
      const for1howmuch0 = r0 / r1;
      const for0howmuch1 = r1 / r0;

      setValue_0(_value1 * for1howmuch0);
      setRatio0per1(for0howmuch1.toFixed(4));
      setRatio1per0(for1howmuch0.toFixed(4));

      const liquidity = Math.min(
        (_value1 * for1howmuch0 * ts) / r0,
        (_value1 * ts) / r1
      );
      setLiquidity(liquidity);

      const myShare =
        (parseFloat(liquidity) / (parseFloat(liquidity) + parseFloat(ts))) *
        100;
      setPoolShare(myShare.toFixed(3));
    }
  };

  const getMaxVal0 = (e) => {
    e.preventDefault();
    setValue_0(balance0);
    calculateInput1(balance0);
  };
  const getMaxVal1 = (e) => {
    e.preventDefault();
    setValue_1(balance1);
    calculateInput0(balance1);
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  if (modalIsOpen === false) {
    getBlockData();
  }
  if (modalIsOpen2 === false) {
    getBlockData();
  }

  if (modalIsOpen3 === false) {
    getBlockData();
  }

  const handleToast = () => {
    toast.success("Exchange Successfull", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="exchange-page">
      <ToastContainer
        style={{ width: "400px" }}
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
      <SelectModal
        setcoin={setCoin}
        coin={Coin}
        oppositeCoin={Coin2}
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        setValue_0={setValue_0}
        setValue_1={setValue_1}
        setAmountOutMin={setAmountOutMin}
      />
      <SelectModal
        setcoin={setCoin2}
        coin={Coin2}
        oppositeCoin={Coin}
        setIsOpen={setIsOpen2}
        modalIsOpen={modalIsOpen2}
        setValue_0={setValue_0}
        setValue_1={setValue_1}
        setAmountOutMin={setAmountOutMin}
      />
      <AddLiqModal
        modalIsOpen={modalIsOpen3}
        setIsOpen={setIsOpen3}
        setIsOpenSucc={setIsOpen4}
        value_0={value_0}
        value_1={value_1}
        token0={Coin.address}
        coin0={Coin}
        token1={Coin2.address}
        coin1={Coin2}
        slippage={slippage}
        rate0per1={ratio0per1}
        rate1per0={ratio1per0}
        sharePool={poolShare}
        firstTime={firstTime}
        liquidity={liquidity}
      />
      {/* <AddSuccess modalIsOpen={modalIsOpen4} setIsOpenSucc={setIsOpen4} /> */}
      <Top title="Liquidity" />
      <div className="add-liquidity-whole">
        <div
          className="exchange-main"
          style={{
            flexDirection: winWidth < 1600 ? "column" : "row",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              height: winWidth < 1600 ? "630px" : "600px",
              marginRight: winWidth < 1600 ? "0" : "40",
              width: "500px",
            }}
            className="exchange-box"
          >
            <h2 color="#444444"> {title} </h2>
            <form className="exchange-form">
              <div className="form-top">
                <span> Input </span>
                <div className="exchange-coin-select">
                  <button className="form-max" onClick={(e) => getMaxVal0(e)}>
                    {" "}
                    MAX{" "}
                  </button>
                  <img onClick={openModal} src={Coin.img} alt="" />
                  <span onClick={openModal}>{Coin.name}</span>
                  <img onClick={openModal} src={Arrow} alt="" />
                </div>
              </div>
              <div className="form-bot">
                <input
                  className="text-box"
                  type="number"
                  value={value_0}
                  onChange={async (e) => {
                    setValue_0(e.target.value);
                    await calculateInput1(e.target.value);
                  }}
                  placeholder="00.00"
                />
                <span className="balance">
                  Balance:{" "}
                  {Intl.NumberFormat("en-GB", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(parseFloat(balance0).toFixed(4))}
                </span>
              </div>
            </form>
            <img
              className="transfer-btwn"
              src={Transfer}
              onClick={handleTransfer}
              alt=""
            />
            <form className="exchange-form">
              <div className="form-top">
                <span> Input </span>
                <div className="exchange-coin-select">
                  <button className="form-max" onClick={(e) => getMaxVal1(e)}>
                    MAX{" "}
                  </button>
                  <img
                    onClick={(e) => setIsOpen2(true)}
                    src={Coin2.img}
                    alt=""
                  />
                  <span onClick={(e) => setIsOpen2(true)}>{Coin2.name}</span>
                  <img onClick={(e) => setIsOpen2(true)} src={Arrow} alt="" />
                </div>
              </div>
              <div className="form-bot">
                <input
                  className="text-box"
                  type="number"
                  value={value_1}
                  onChange={async (e) => {
                    setValue_1(e.target.value);
                    await calculateInput0(e.target.value);
                  }}
                  placeholder="00.00"
                />
                <span className="balance">
                  Balance:{" "}
                  {Intl.NumberFormat("en-GB", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(parseFloat(balance1).toFixed(4))}
                </span>
              </div>
            </form>
            <div className="liquid-box-bot">
              <h3> Price and Pool Share </h3>
              <div className="liquid-box-infos">
                <div className="liquid-box-info">
                  <span>{ratio0per1}</span>
                  <span>
                    {Coin.name} per {Coin2.name}
                  </span>
                </div>
                <div className="liquid-box-info">
                  <span>{ratio1per0}</span>
                  <span>
                    {Coin2.name} per {Coin.name}
                  </span>
                </div>
                <div className="liquid-box-info">
                  <span>{poolShare} %</span>
                  <span> Share of Pool </span>
                </div>
              </div>
            </div>
            <div className="approve-buttons">
              {allowed0 ? (
                <div></div>
              ) : (
                <button
                  className="approve-btn"
                  onClick={async (e) => {
                    try {
                      await approve(Coin.address);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Approve <img src={Coin.img} alt="" />
                </button>
              )}

              {allowed1 ? (
                <div></div>
              ) : (
                <button
                  className="approve-btn"
                  onClick={async (e) => {
                    try {
                      await approve(Coin2.address);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Approve <img src={Coin2.img} alt="" />
                </button>
              )}
            </div>
            {allowed0 && allowed1 ? (
              <div className="liquid-btn">
                <button onClick={() => setIsOpen3(true)}>
                  <div> Add Liquidity </div>
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {hasLP ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {winWidth > 1600 ? (
                <YourPosition
                  coinName={Coin.name}
                  coinImg={Coin.img}
                  coinAdd={Coin.address}
                  coinName2={Coin2.name}
                  coinImg2={Coin2.img}
                  coinAdd2={Coin2.address}
                  props={transfer}
                />
              ) : (
                <Link style={{ textDecoration: "none" }}>
                  <span className="view-more"> View More Info </span>
                </Link>
              )}
              <LiquidityRemove
                //variableInComponent={variableHere}
                getBlockData={getBlockData}
                approved={removeApprove}
                setApproved={setRemoveApprove}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiquidityAdd;
