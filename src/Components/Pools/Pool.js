import React, { useState, useEffect } from "react";
import BTC from "../../assets/btc-logo.svg";
import LIME from "../../assets/lime-logo.svg";
import True from "../../assets/true.svg";
import ReactCardFlip from "react-card-flip";
import Lemonade3D1 from "../../assets/lemonade3D1.png";
import Lemonade3D2 from "../../assets/lemonade3D2.png";

import Web3 from "web3";

import PoolUnlockerLMD from "../../abis/PoolUnlockerLMD.json";
import MasterChef from "../../abis/MasterChef.json";
import Sushi from "../../abis/SushiToken.json";
import testingData from "../../utils/hardCoded";
import tokenABI from "../../utils/Utils";
// import { TRUE } from 'node-sass'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {
  setIntervalAsync,
  clearIntervalAsync,
} = require("set-interval-async/fixed");

const Pool = (props) => {
  const [IsFlippedIndivitual, setIsFlippedIndivitual] = useState(false);
  const [allowed0, setAllowed0] = useState(false);
  const [stake0, setStaked0] = useState(0);
  const [rewards0, setRewards0] = useState(0);

  const [inputValue, setInputValue] = useState(0);

  const handleToast = () => {
    toast.success("Deposit Success", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleErrorToast = () => {
    toast.error("Deposit Reverted", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

          if (props.coinName === "LMD") {
            const unlock_contract = new web3.eth.Contract(
              PoolUnlockerLMD.abi,
              testingData.poolUnlock.LMD.address
            );

            const masterChef = new web3.eth.Contract(
              MasterChef.abi,
              testingData.sushi.masterChef.address
            );

            const token_ = new web3.eth.Contract(
              tokenABI,
              testingData.tokens.LMD.address
            );

            const lmdBalance = await token_.methods
              .balanceOf(accounts[0])
              .call({ from: accounts[0] });

            props.setBalance(web3.utils.fromWei(lmdBalance));

            const pending = await masterChef.methods
              .pendingSushi(3, accounts[0])
              .call({
                from: accounts[0],
              });
            console.log(pending);

            if (pending !== undefined) {
              const rew = parseFloat(web3.utils.fromWei(pending))
                .toFixed(3)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

              setRewards0(rew);
            }

            const unlocked = await unlock_contract.methods
              .unlockList(accounts[0])
              .call({ from: accounts[0] });

            if (unlocked.unlocked === true) {
              //? User has pool unlocked
              setIsFlippedIndivitual(true);
            } else {
              setIsFlippedIndivitual(false);
            }

            if (props.token0 === testingData.tokens.LMD.address) {
              const token = new web3.eth.Contract(tokenABI, props.token0);

              const allowed0Amount = await token.methods
                .allowance(accounts[0], testingData.sushi.masterChef.address)
                .call({ from: accounts[0] });

              if (allowed0Amount === "0") {
                setAllowed0(false);
              } else {
                setAllowed0(true);
              }

              const poolUserData = await masterChef.methods
                .userInfo(3, accounts[0])
                .call({ from: accounts[0] });

              setStaked0(web3.utils.fromWei(poolUserData.amount));
            }
            //* For other POOLS ADD:
            // else if (props.token === testingData.tokens.LMD.address) {
            //   const token0 = new web3.eth.Contract(
            //     tokenABI,
            //     testingData.tokens.LMD.address,
            //   )

            //   const allowed0Amount = await token0.methods
            //     .allowance(accounts[0], testingData.swap.router.address)
            //     .call({ from: accounts[0] })

            //   if (allowed0Amount === '0') {
            //     setAllowed0(false)
            //   } else {
            //     setAllowed0(true)
            //   }
            // }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getMax0 = () => {
    setInputValue(props.balance);
    console.log(props.balance);
  };

  const triggerUnlockPool = async () => {
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

          if (props.coinName === "LMD") {
            const unlock_contract = new web3.eth.Contract(
              PoolUnlockerLMD.abi,
              testingData.poolUnlock.LMD.address
            );
            try {
              const unlocked = await unlock_contract.methods.unlock().send({
                from: accounts[0],
                gas: gas,
                value: web3.utils.toWei("1"),
              });

              props.setIsFlipped(true);
              setIsFlippedIndivitual(true);
            } catch (e) {
              setIsFlippedIndivitual(false);
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const approve = async (_address) => {
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

          const token = new web3.eth.Contract(Sushi.abi, _address);

          await token.methods
            .approve(
              testingData.sushi.masterChef.address,
              web3.utils
                .toBN(2)
                .pow(web3.utils.toBN(256))
                .sub(web3.utils.toBN(1))
            )
            .send({
              from: accounts[0],
              gas: gas,
            });

          if (_address === testingData.tokens.LMD.address) {
            setAllowed0(true);
          }

          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const deposit0 = async (_value) => {
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

          const masterChef = new web3.eth.Contract(
            MasterChef.abi,
            testingData.sushi.masterChef.address
          );
          try {
            await masterChef.methods
              .deposit(3, web3.utils.toWei(_value.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });

            props.depositSuccess();
            await getBlockData();
            setInputValue("");
          } catch (e) {
            props.depositError();

            console.log(e);
          }
          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        props.depositError();
        console.log(e);
      }
    }
  };

  const withdraw0 = async () => {
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

          const masterChef = new web3.eth.Contract(
            MasterChef.abi,
            testingData.sushi.masterChef.address
          );

          if (inputValue !== 0) {
            await masterChef.methods
              .withdraw(3, web3.utils.toWei(inputValue.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
          }
          await getBlockData();
          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const withdraw0All = async () => {
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

          const masterChef = new web3.eth.Contract(
            MasterChef.abi,
            testingData.sushi.masterChef.address
          );

          const stakedAmount = await masterChef.methods
            .userInfo(3, accounts[0])
            .call({ from: accounts[0] });

          const amo = stakedAmount.amount;

          console.log(amo);

          await masterChef.methods.withdraw(3, amo).send({
            from: accounts[0],
          });

          await getBlockData();
          setInputValue("");
          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const fetchRewards = async () => {
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

          const masterChef = new web3.eth.Contract(
            MasterChef.abi,
            testingData.sushi.masterChef.address
          );
          try {
            const token = new web3.eth.Contract(
              tokenABI,
              testingData.tokens.LMD.address
            );

            const data = await token.methods
              .balanceOf(testingData.sushi.masterChef.address)
              .call({ from: accounts[0] });

            const reward = await masterChef.methods
              .pendingSushi(3, accounts[0])
              .call({ from: accounts[0] });

            console.log(reward);
            console.log(reward);
            console.log(reward);

            const rewdisp = parseFloat(web3.utils.fromWei(reward))
              .toFixed(3)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            setRewards0(rewdisp);

            return rewdisp;
          } catch (e) {
            return 0;
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  useEffect(() => {
    const timer = setIntervalAsync(async () => {
      const resp = await fetchRewards();
      // setRewards0(resp)
      console.log(resp);
    }, 5 * 1000);
    return async () => await clearIntervalAsync(timer);
  });

  return (
    <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal">
      <div className="back">
        {" "}
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
        </div>{" "}
        <button onClick={() => triggerUnlockPool()} className="back-unlock">
          Unlock
        </button>
      </div>
      <div className="pool-box">
        <div className="pool-box-top">
          <div className="pool-top-info">
            <div className="coin-icon">
              <img src={props.coinImage} alt="" />
            </div>
            <div className="coin-name">
              <span>{props.coinName}</span>
            </div>
          </div>
          <img className="true-logo" src={True} alt="" />
        </div>

        <div className="pool-box-mid">
          <div className="lmd-info">
            <span>Earned {props.coinName}</span>
            <span>{rewards0}</span>
          </div>
          {/* <button>Harvest</button> */}
        </div>

        <div className="pool-box-bot">
          <div className="info">
            <span>APY</span>
            <span>78%</span>
          </div>
          <div className="info">
            <span>Your Stake</span>
            <span>
              {Intl.NumberFormat("en-GB", {
                notation: "compact",
                compactDisplay: "short",
              }).format(stake0)}
            </span>
          </div>
        </div>

        <div className="pool-input">
          <input
            type="number"
            value={inputValue}
            placeholder="00.00"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              getMax0();
            }}
          >
            Max
          </button>
        </div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#959595",
            alignSelf: "flex-end",
          }}
        >
          Balance:{" "}
          <font color="#444444">{parseFloat(props.balance).toFixed(5)}</font>
        </span>
        {allowed0 ? (
          <div></div>
        ) : (
          <button
            className="approve-btn"
            onClick={async () => {
              await approve(props.token0);
            }}
          >
            Approve <img src={props.coinImage} alt="" />
          </button>
        )}
        <button
          style={{ display: allowed0 ? "flex" : "none" }}
          className="deposit-btn"
          onClick={async (e) => {
            if (inputValue === "") {
            } else {
              await deposit0(inputValue);
            }
          }}
        >
          Deposit
        </button>
        <br></br>
        <div
          style={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={{ display: allowed0 ? "flex" : "none" }}
            className="withdraw-btn"
            onClick={async () => {
              if (inputValue === "") {
              } else {
                await withdraw0();
              }
            }}
          >
            Withdraw
          </button>
          <button
            className="withdraw-all"
            onClick={async () => {
              await withdraw0All();
            }}
          >
            Withdraw All
          </button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Pool;
