import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "react-modal";
import "./Exchange.scss";

import Top from "../Top/Top";
import Set from "../../assets/exchange-set.svg";
import Arrow from "../../assets/arrow.svg";
import EWT from "../../assets/EWT.png";
import Transfer from "../../assets/transfer.svg";
import SelectModal from "../SelectModal/SelectModal";
import CoinContext from "../../CoinContext";
import { useContext } from "react";
import AddLiqModal from "../AddLiqModal/AddLiqModal";
import AddSuccess from "../AddSuccess/AddSuccess";

import Web3 from "web3";

import Factory from "../../abis/UniswapV2Factory.json";
import Pair from "../../abis/UniswapV2Pair.json";
import Router from "../../abis/UniswapV2Router02.json";

import testingData from "../../utils/hardCoded";
import tokenABI from "../../utils/Utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Exchange = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [modalIsOpen4, setIsOpen4] = useState(false);
  const [state, setState] = useState(0);

  const { setCoin, setCoin2, Coin, Coin2 } = useContext(CoinContext);

  const [slippage, setSlippage] = useState(0.7);

  const [value_0, setValue_0] = useState(0);
  const [value_1, setValue_1] = useState(0);

  const [allowed0, setAllowed0] = useState(false);
  const [allowed1, setAllowed1] = useState(false);
  const [balance0, setBalance0] = useState("0");
  const [balance1, setBalance1] = useState("0");

  const inputDefault = 0;

  const [noLiquidity, setNoLiquidity] = useState(false);
  const [amountOutMin, setAmountOutMin] = useState(0);
  const [amountOut, setAmountOut] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);

  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState(false);

  const [disableApprove, setDisableApprove] = useState(false);

  const [disableSwap, setDisableSwap] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const handleSlippageChange = (e) => {
    const val = e.target.value;
    if (val < 100) {
      setSlippage(val);
      calculateInput0(value_1);
      calculateInput1(value_0);
    } else {
      setSlippage(0.9);
      calculateInput0(value_1);
      calculateInput1(value_0);
    }
  };

  function closeModalSet() {
    setIsOpen3(false);
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
            setNoLiquidity(true);
          } else {
          }
          setNoLiquidity(false);

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
    setDisableApprove(true);
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
          const gas = new web3.utils.BN("6000000");

          const token = new web3.eth.Contract(tokenABI, _address);

          await token.methods
            .approve(
              testingData.swap.router.address,
              web3.utils
                .toBN(2)
                .pow(web3.utils.toBN(256))
                .sub(web3.utils.toBN(1))
            )
            .send({
              from: accounts[0],
            });

          if (_address === Coin.address) {
            setAllowed0(true);
          } else if (_address === Coin2.address) {
            setAllowed1(true);
          }
          setDisableApprove(false);
        });
      } catch (e) {
        setDisableApprove(false);
        console.log(e);
      }
    }
  };

  const calculateInput1 = async (_value0) => {
    if (_value0 !== "") {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      const router = new web3.eth.Contract(
        Router.abi,
        testingData.swap.router.address
      );
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
        setNoLiquidity(true);
        setAmountOutMin(0);
        setValue_1(Infinity);
      } else {
        try {
          setNoLiquidity(false);

          const amountOut = await router.methods
            .getAmountsOut(web3.utils.toWei(_value0.toString()), [
              Coin.address,
              Coin2.address,
            ])
            .call({
              from: accounts[0],
            });

          let amountOutMin = web3.utils.fromWei(amountOut[1].toString());
          setValue_1(amountOutMin);

          let usableSlippage = 1 - slippage / 100;

          amountOutMin = amountOutMin * usableSlippage;
          setAmountOutMin(amountOutMin);

          const pair_address = await factory.methods
            .getPair(Coin.address, Coin2.address)
            .call({
              from: accounts[0],
            });
          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

          const pair_token0 = await pair_contract.methods.token0().call({
            from: accounts[1],
          });
          const data = await pair_contract.methods.getReserves().call({
            from: accounts[0],
          });

          const r0 = web3.utils.fromWei(data._reserve0);
          const r1 = web3.utils.fromWei(data._reserve1);

          const amountInn = _value0;
          const amountOutt = web3.utils.fromWei(amountOut[1].toString());

          if (pair_token0 === Coin.address) {
            const kpre = r0 / r1;

            console.log("here");
            console.log(amountInn);
            console.log(amountOutt);

            const result = parseFloat(amountInn) / parseFloat(amountOutt);

            const priceImpact = ((result - kpre) / kpre) * 100;
            console.log(priceImpact);
            if (priceImpact > 99.7) {
              setPriceImpact(99.7);
            } else {
              setPriceImpact(priceImpact.toFixed());
              console.log(priceImpact);
            }
          } else {
            //* pair_token0 === Coin2.address
            const kpre = r1 / r0;

            console.log(amountInn);
            console.log(amountOutt);
            const result = parseFloat(amountInn) / parseFloat(amountOutt);
            const priceImpact = ((result - kpre) / kpre) * 100;
            console.log(priceImpact);

            if (priceImpact > 99.7) {
              setPriceImpact(99.7);
            } else {
              setPriceImpact(priceImpact);
              console.log(priceImpact);
            }
          }
        } catch (e) {
          setValue_1("");
          setAmountOutMin(0);
          console.log(e);
          setPriceImpact(99.7);
        }
      }
    }
  };

  const calculateInput0 = async (_value1) => {
    if (_value1 !== "") {
      const web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      const router = new web3.eth.Contract(
        Router.abi,
        testingData.swap.router.address
      );

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
        setNoLiquidity(true);
        setAmountOutMin(0);
        setValue_0(Infinity);
      } else {
        setNoLiquidity(false);
        const weiAmo = web3.utils.toWei(_value1.toString());
        try {
          const amountIn = await router.methods
            .getAmountsIn(weiAmo, [Coin.address, Coin2.address])
            .call({
              from: accounts[0],
            });

          let amountInMin = web3.utils.fromWei(amountIn[0].toString());
          setValue_0(
            Intl.NumberFormat("en-GB", {
              notation: "compact",
              compactDisplay: "short",
            }).format(amountInMin)
          );

          let usableSlippage = 1 - slippage / 100;

          setAmountOutMin(_value1);
          setAmountOutMin(_value1 * usableSlippage);

          //TODO : aqui
          const pair_address = await factory.methods
            .getPair(Coin.address, Coin2.address)
            .call({
              from: accounts[0],
            });

          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

          const pair_token0 = await pair_contract.methods.token0().call({
            from: accounts[1],
          });
          const data = await pair_contract.methods.getReserves().call({
            from: accounts[0],
          });

          const r0 = web3.utils.fromWei(data._reserve0);
          const r1 = web3.utils.fromWei(data._reserve1);

          const amountInn = web3.utils.fromWei(amountIn[0].toString());

          if (pair_token0 === Coin.address) {
            const kpre = r0 / r1;

            console.log("here");

            const result = parseFloat(amountInn) / parseFloat(_value1);

            const priceImpact = ((result - kpre) / kpre) * 100;

            console.log(priceImpact);
            setPriceImpact(priceImpact);
          } else {
            //* pair_token0 === Coin2.address
            const kpre = r1 / r0;

            const result = parseFloat(amountInn) / parseFloat(_value1);

            const priceImpact = ((result - kpre) / kpre) * 100;

            console.log(priceImpact);
            if (priceImpact > 99.7) {
              setPriceImpact(99.7);
            } else {
              setPriceImpact(priceImpact.toFixed(2));
            }
          }

          //TODO : aqui
        } catch (e) {
          setValue_0("");
          setAmountOutMin(0);
          console.log(e);
          setPriceImpact(99.7);
        }
      }
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

  const submitSwap = async () => {
    setIsOpen4(true);
    setDisableSwap(true);
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
          const gas = new web3.utils.BN("6000000");

          const router = new web3.eth.Contract(
            Router.abi,
            testingData.swap.router.address
          );

          if (Coin.address === testingData.tokens.WETH.address) {
            //* ETH --> Token Swap

            try {
              const tx = await router.methods
                .swapETHForExactTokens(
                  web3.utils.toWei(value_1.toString()),
                  [Coin.address, Coin2.address],
                  accounts[0],
                  Math.floor(Date.now() / 1000) + 60 * 10
                )
                .send({
                  from: accounts[0],
                  value: web3.utils.toWei(value_0.toString()),
                });

              setTxHash(tx.transactionHash);
              setState(1);
              setDisableSwap(false);
            } catch (e) {
              setState(2);
              setDisableSwap(false);
              console.log(e);
            }
          } else if (Coin2.address === testingData.tokens.WETH.address) {
            //* Token --> ETH Swap

            try {
              const tx = await router.methods
                .swapExactTokensForETH(
                  web3.utils.toWei(value_0.toString()),
                  web3.utils.toWei(amountOutMin.toString()),
                  [Coin.address, Coin2.address],
                  accounts[0],
                  Math.floor(Date.now() / 1000) + 60 * 10
                )
                .send({
                  from: accounts[0],
                });
              setTxHash(tx.transactionHash);
              setState(1);
              setDisableSwap(false);
            } catch (e) {
              setState(2);
              setDisableSwap(false);

              console.log(e);
            }
          } else {
            //* Token --> Token Swap

            try {
              const tx = await router.methods
                .swapTokensForExactTokens(
                  web3.utils.toWei(value_1.toString()),
                  web3.utils.toWei(value_0.toString()),
                  [Coin.address, Coin2.address],
                  accounts[0],
                  Math.floor(Date.now() / 1000) + 60 * 10
                )
                .send({
                  from: accounts[0],
                });
              setTxHash(tx.transactionHash);
              setState(1);
              setDisableSwap(false);
            } catch (e) {
              setState(2);
              setDisableSwap(false);
            }
          }
          console.log(txHash);

          // TODO: Change
          // if (txHash === '') {
          //   setState(2)
          // } else {
          //   setState(1)
          // }
          const token0 = new web3.eth.Contract(tokenABI, Coin.address);
          const token1 = new web3.eth.Contract(tokenABI, Coin2.address);

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
          setDisableSwap(false);
        });
      } catch (e) {
        setState(2);
        setDisableSwap(false);

        console.log(e);
      }
    }
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

  return (
    <div className="exchange-page">
      <AddSuccess
        setIsOpen={setIsOpen4}
        modalIsOpen={modalIsOpen4}
        state={state}
        setState={setState}
        coin={Coin}
        coin2={Coin2}
        txHash={txHash}
        error={error}
        exchange={true}
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
      <Modal
        isOpen={modalIsOpen3}
        onRequestClose={closeModalSet}
        contentLabel="Example Modal"
        className="set-modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
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
                  slippage === 1
                    ? "linear-gradient( 90deg, rgba(216, 223, 0, 1) 0%, rgba(96, 223, 0, 1) 100%)"
                    : "",
              }}
            >
              Auto
            </button>
            <div style={{ position: "relative" }}>
              <input
                type="number"
                placeholder="2.0"
                onChange={handleSlippageChange}
              />
              <span>%</span>
            </div>
          </div>
          {/* <span>Transaction Deadline</span>
          <div className="transaction-deadline">
            <input type="number" /> <span>minutes</span>
          </div> */}
        </div>
      </Modal>

      <Top title="Exchange" />
      <div className="exchange-main">
        <div className="exchange-box">
          <div className="exchange-box-top">
            <span>Trade tokens in an instant</span>
            <img
              src={Set}
              className="exchange-setting"
              onClick={() => setIsOpen3(true)}
            />
          </div>
          <h2>Exchange</h2>
          <form className="exchange-form">
            <div className="form-top">
              <span>From</span>
              <div className="exchange-coin-select">
                <button className="form-max" onClick={(e) => getMaxVal0(e)}>
                  {" "}
                  MAX{" "}
                </button>
                <img onClick={openModal} src={Coin.img} alt="" />{" "}
                <span onClick={openModal}>{Coin.name}</span>{" "}
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
              <span>To</span>
              <div className="exchange-coin-select">
                <button className="form-max" onClick={(e) => getMaxVal1(e)}>
                  {" "}
                  MAX{" "}
                </button>
                <img
                  onClick={() => setIsOpen2(true)}
                  src={Coin2.img}
                  alt=""
                />{" "}
                <span onClick={() => setIsOpen2(true)}>{Coin2.name}</span>{" "}
                <img onClick={() => setIsOpen2(true)} src={Arrow} alt="" />
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
                Balance: 
                {Intl.NumberFormat("en-GB", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(parseFloat(balance1).toFixed(4))}
              </span>
            </div>
          </form>
          <div className="exchange-box-bot">
            <div className="bot-text">
              Slippage Tolerance{" "}
              <span>{parseFloat(slippage).toFixed(2)} %</span>
            </div>
            <div className="bot-text">
              Price{" "}
              <span>
                {(value_0 / value_1).toFixed(5)} {Coin.name} per {Coin2.name}
              </span>
            </div>
            <div className="approve-buttons">
              {allowed0 ? (
                <div></div>
              ) : (
                <button
                  className="approve-btn"
                  onClick={
                    disableApprove
                      ? () => {}
                      : async (e) => {
                          try {
                            await approve(Coin.address);
                          } catch (e) {
                            console.log(e);
                          }
                        }
                  }
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
            {value_0 === Infinity || value_1 === Infinity || noLiquidity ? (
              <div className="exchange-btn">
                <button style={{ backgroundColor: "red", color: "white" }}>
                  <div>Not enough Liquidity</div>
                </button>
              </div>
            ) : (
              <div className="exchange-btn">
                <button
                  onClick={
                    disableSwap
                      ? () => {}
                      : async () => {
                          await submitSwap();
                        }
                  }
                >
                  <div>Swap/Exchange</div>
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="exchange-info"
          style={{
            display: Coin.value === "" && Coin2.value === "" ? "none" : "unset",
          }}
        >
          <div className="exchange-text">
            Minimum received{" "}
            <span>
              {parseFloat(amountOutMin).toFixed(3)} {Coin2.name}
            </span>
          </div>
          <div className="exchange-text">
            Price Impact
            {priceImpact < 20 ? (
              <span>
                <font>{parseFloat(priceImpact).toFixed(2)}%</font>
              </span>
            ) : priceImpact > 20 && priceImpact < 40 ? (
              <font color="orange">{parseFloat(priceImpact).toFixed(2)}%</font>
            ) : (
              <font color="red">{parseFloat(priceImpact).toFixed(2)}%</font>
            )}
          </div>
          <div className="exchange-text">
            Liquidity Provider Fee
            <span>
              {(value_0 * 0.005).toFixed(3)} {Coin.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
