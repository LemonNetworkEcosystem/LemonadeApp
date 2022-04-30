import React, { useEffect, useState } from "react";
import Top from "../Top/Top";
import ReactSlider from "react-slider";
import lemonLogo from "../../assets/lemon-logo.svg";
import YourPosition from "./YourPosition";
import CoinContext from "../../CoinContext";
import { useContext } from "react";

import Web3 from "web3";

import Factory from "../../abis/UniswapV2Factory.json";
import Pair from "../../abis/UniswapV2Pair.json";
import Router from "../../abis/UniswapV2Router02.json";
import testingData from "../../utils/hardCoded";
import tokenABI from "../../utils/Utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LiquidityRemove = (props, state) => {
  const { setCoin, setCoin2, Coin, Coin2 } = useContext(CoinContext);
  const [showRemove, setShowRemove] = useState(false);

  const [percentage, setPercentage] = useState(0.25);

  const [remove0, setRemove0] = useState(0);
  const [remove1, setRemove1] = useState(0);

  const [approved, setApproved] = useState(false);

  const [ratio0, setRatio0] = useState(0);
  const [ratio1, setRatio1] = useState(0);

  const [disableRemove, setDisableRemove] = useState(false);
  const [disableApprove, setDisableApprove] = useState(false);

  const steps = [25, 50, 75, 100];
  const winWidth = window.innerWidth;

  const slippage = 0.1;

  const handleToast = () => {
    toast.success("Remove Liquidity Success", {
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
    toast.error("Remove Liquidity Reverted", {
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
    const web3 = new Web3(window.ethereum);
    try {
      // User has allowed account access to DApp...
      const netId = await web3.eth.net.getId();

      const accounts = await web3.eth.getAccounts();

      const factory = new web3.eth.Contract(
        Factory.abi,
        testingData.swap.factory.address
      );

      const pair_address = await factory.methods
        .getPair(Coin.address, Coin2.address)
        .call({ from: accounts[0] });

      const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

      const allowance = await pair_contract.methods
        .allowance(accounts[0], testingData.swap.router.address)
        .call({ from: accounts[0] });

      if (web3.utils.fromWei(allowance) !== "0") {
        setApproved(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const calculate25 = async () => {
    setPercentage(0.25);
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

        const pair_address = await factory.methods
          .getPair(Coin.address, Coin2.address)
          .call({ from: accounts[0] });

        const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

        const reserves = await pair_contract.methods
          .getReserves()
          .call({ from: accounts[0] });

        const r0 = reserves._reserve0;
        const r1 = reserves._reserve1;

        const pair_token0 = await pair_contract.methods
          .token0()
          .call({ from: accounts[0] });

        const user_lp = await pair_contract.methods
          .balanceOf(accounts[0])
          .call({ from: accounts[0] });

        const total_lps = await pair_contract.methods
          .totalSupply()
          .call({ from: accounts[0] });

        console.log(total_lps);

        let remove0;
        let remove1;

        if (pair_token0 === Coin.address) {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
        } else {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
        }

        console.log(remove0);
        console.log(remove1);

        remove0 = remove0 * 0.25;
        remove1 = remove1 * 0.25;

        setRemove0(remove0.toFixed(5));
        setRemove1(remove1.toFixed(5));

        setRatio0(remove0 / remove1);
        setRatio1(remove1 / remove0);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculate50 = async () => {
    setPercentage(0.5);
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

        const pair_address = await factory.methods
          .getPair(Coin.address, Coin2.address)
          .call({ from: accounts[0] });

        const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

        const reserves = await pair_contract.methods
          .getReserves()
          .call({ from: accounts[0] });

        const r0 = reserves._reserve0;
        const r1 = reserves._reserve1;

        const pair_token0 = await pair_contract.methods
          .token0()
          .call({ from: accounts[0] });

        const user_lp = await pair_contract.methods
          .balanceOf(accounts[0])
          .call({ from: accounts[0] });

        const total_lps = await pair_contract.methods
          .totalSupply()
          .call({ from: accounts[0] });

        console.log(total_lps);

        let remove0;
        let remove1;

        if (pair_token0 === Coin.address) {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
        } else {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
        }

        console.log(remove0);
        console.log(remove1);

        remove0 = remove0 * 0.5;
        remove1 = remove1 * 0.5;

        setRemove0(remove0.toFixed(5));
        setRemove1(remove1.toFixed(5));

        setRatio0(remove0 / remove1);
        setRatio1(remove1 / remove0);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculate75 = async () => {
    setPercentage(0.75);
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

        const pair_address = await factory.methods
          .getPair(Coin.address, Coin2.address)
          .call({ from: accounts[0] });

        const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

        const reserves = await pair_contract.methods
          .getReserves()
          .call({ from: accounts[0] });

        const r0 = reserves._reserve0;
        const r1 = reserves._reserve1;

        const pair_token0 = await pair_contract.methods
          .token0()
          .call({ from: accounts[0] });

        const user_lp = await pair_contract.methods
          .balanceOf(accounts[0])
          .call({ from: accounts[0] });

        const total_lps = await pair_contract.methods
          .totalSupply()
          .call({ from: accounts[0] });

        console.log(total_lps);

        let remove0;
        let remove1;

        if (pair_token0 === Coin.address) {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
        } else {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
        }

        console.log(remove0);
        console.log(remove1);

        remove0 = remove0 * 0.75;
        remove1 = remove1 * 0.75;

        setRemove0(remove0.toFixed(5));
        setRemove1(remove1.toFixed(5));

        setRatio0(remove0 / remove1);
        setRatio1(remove1 / remove0);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculate100 = async () => {
    setPercentage(1);
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

        const pair_address = await factory.methods
          .getPair(Coin.address, Coin2.address)
          .call({ from: accounts[0] });

        const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

        const reserves = await pair_contract.methods
          .getReserves()
          .call({ from: accounts[0] });

        const r0 = reserves._reserve0;
        const r1 = reserves._reserve1;

        const pair_token0 = await pair_contract.methods
          .token0()
          .call({ from: accounts[0] });

        const user_lp = await pair_contract.methods
          .balanceOf(accounts[0])
          .call({ from: accounts[0] });

        const total_lps = await pair_contract.methods
          .totalSupply()
          .call({ from: accounts[0] });

        console.log(total_lps);

        let remove0;
        let remove1;

        if (pair_token0 === Coin.address) {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
        } else {
          remove0 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r1.toString());
          remove1 =
            (web3.utils.fromWei(user_lp.toString()) /
              web3.utils.fromWei(total_lps.toString())) *
            web3.utils.fromWei(r0.toString());
        }

        console.log(remove0);
        console.log(remove1);

        remove0 = remove0 * 1;
        remove1 = remove1 * 1;

        setRemove0(remove0.toFixed(5));
        setRemove1(remove1.toFixed(5));

        setRatio0(remove0 / remove1);
        setRatio1(remove1 / remove0);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeLiquidity = async () => {
    const web3 = new Web3(window.ethereum);
    // User has allowed account access to DApp...
    const netId = await web3.eth.net.getId();
    setDisableRemove(true);

    const accounts = await web3.eth.getAccounts();
    const gas = new web3.utils.BN("6000000");

    try {
      const router = new web3.eth.Contract(
        Router.abi,
        testingData.swap.router.address
      );

      const factory = new web3.eth.Contract(
        Factory.abi,
        testingData.swap.factory.address
      );

      const pair_address = await factory.methods
        .getPair(Coin.address, Coin2.address)
        .call({ from: accounts[0] });

      const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

      const token_balance = await pair_contract.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] });

      if (
        Coin.address === testingData.tokens.WETH.address ||
        Coin2.address === testingData.tokens.WETH.address
      ) {
        if (Coin.address === testingData.tokens.WETH.address) {
          const liquid = web3.utils.fromWei(token_balance) * percentage;
          const amount = web3.utils.toWei(liquid.toString());
          await router.methods
            .removeLiquidityETH(
              Coin2.address,
              amount,
              0,
              0,
              //   web3.utils.toWei(remove0.toString()),
              //   web3.utils.toWei(remove1.toString()),
              accounts[0],
              Math.floor(Date.now() / 1000) + 60 * 10
            )
            .send({ from: accounts[0], gas: gas });
          handleToast();

          await props.getBlockData();
          setDisableRemove(false);
        } else {
          const liquid = web3.utils.fromWei(token_balance) * percentage;
          const amount = web3.utils.toWei(liquid.toString());
          await router.methods
            .removeLiquidityETH(
              Coin.address,
              amount,
              0,
              0,
              //   web3.utils.toWei(remove0.toString()),
              //   web3.utils.toWei(remove1.toString()),
              accounts[0],
              Math.floor(Date.now() / 1000) + 60 * 10
            )
            .send({ from: accounts[0], gas: gas });
          handleToast();

          await props.getBlockData();
          setDisableRemove(false);
        }
      } else {
        //* Removing Liquidity token-token
        const liquid = web3.utils.fromWei(token_balance) * percentage;
        const amount = web3.utils.toWei(liquid.toString());
        await router.methods
          .removeLiquidity(
            Coin.address,
            Coin2.address,
            amount,
            0,
            0,
            //   web3.utils.toWei(remove0.toString()),
            //   web3.utils.toWei(remove1.toString()),
            accounts[0],
            Math.floor(Date.now() / 1000) + 60 * 10
          )
          .send({ from: accounts[0], gas: gas });
        handleToast();

        await props.getBlockData();
        setDisableRemove(false);
      }
    } catch (e) {
      handleErrorToast();
      setDisableRemove(false);
      console.log(e);
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

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );

          const pair_address = await factory.methods
            .getPair(Coin.address, Coin2.address)
            .call({ from: accounts[0] });

          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

          await pair_contract.methods
            .approve(
              testingData.swap.router.address,
              web3.utils
                .toBN(2)
                .pow(web3.utils.toBN(256))
                .sub(web3.utils.toBN(1))
            )
            .send({
              from: accounts[0],
              gas: gas,
            });

          setApproved(true);
          setDisableApprove(false);
          props.setApproved(true);
        });
      } catch (e) {
        setDisableApprove(false);
        console.log(e);
      }
    }
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  return (
    <React.Fragment>
      {showRemove === false ? (
        <div
          className="remove-open-container"
          onClick={() => setShowRemove(true)}
        >
          <span className="remove-open-btn" style={{ color: "#44444" }}>
            Liquidity Remove
          </span>
        </div>
      ) : (
        <div className="liquidity-remove-page">
          <div
            className="liquidity-remove-main  "
            style={{ flexDirection: winWidth < 1600 ? "column" : "row" }}
          >
            <div className="liquidity-remove-box">
              <h2>Remove Liquidity</h2>
              <div className="liquidity-buttons">
                <button
                  onClick={async () => {
                    await calculate25();
                  }}
                >
                  25%
                </button>
                <button
                  onClick={async () => {
                    await calculate50();
                  }}
                >
                  50%
                </button>
                <button
                  onClick={async () => {
                    await calculate75();
                  }}
                >
                  75%
                </button>
                <button
                  onClick={async () => {
                    await calculate100();
                  }}
                >
                  100%
                </button>
              </div>
              <div className="liquidity-below-box">
                <div className="liq-info">
                  <div className="liq-info-coin">
                    <img src={Coin.img} alt="" />
                    <span>
                      <b>{Coin.name}</b>
                    </span>
                  </div>
                  <span>{remove0}</span>
                </div>
                <div className="liq-info">
                  <div className="liq-info-coin">
                    <img src={Coin2.img} alt="" />
                    <span>
                      <b>{Coin2.name}</b>
                    </span>
                  </div>
                  <span>{remove1}</span>
                </div>
              </div>
              <div className="liq-bot">
                <span>
                  1 {Coin.name} = {ratio1.toFixed(4)} {Coin2.name}
                </span>
                <span>
                  1 {Coin2.name} = {ratio0.toFixed(4)} {Coin.name}
                </span>
              </div>

              {!props.approved ? (
                <div className="approve-buttons">
                  <button
                    className="approve-btn"
                    onClick={
                      disableApprove
                        ? () => {}
                        : async (e) => {
                            try {
                              await approve();
                            } catch (e) {
                              console.log(e);
                            }
                          }
                    }
                  >
                    Approve{" "}
                    <div className="coin-icon">
                      <img style={{ width: "10px" }} src={Coin.img} alt="" />
                      <img style={{ width: "10px" }} src={Coin2.img} alt="" />
                    </div>
                  </button>
                </div>
              ) : (
                <div className="liquid-btn">
                  <button
                    onClick={
                      disableRemove
                        ? () => {}
                        : async () => {
                            await removeLiquidity();
                          }
                    }
                  >
                    <div>Remove LP</div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LiquidityRemove;
