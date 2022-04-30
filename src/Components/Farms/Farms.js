import React, { useState, useEffect } from "react";
import Top from "../Top/Top";
import "./Farms.scss";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Farm from "./Farm";
import Search from "../../assets/search.svg";
import LMN from "../../assets/lemon-logo.png";
import LMD from "../../assets/lemonade.svg";
import EWT from "../../assets/EWT.svg";
import USDT from "../../assets/usdt.svg";
import Arrow from "../../assets/arrow.svg";

import Web3 from "web3";
import Factory from "../../abis/UniswapV2Factory.json";
import Pair from "../../abis/UniswapV2Pair.json";
import FarmUnlockerLMNLMD from "../../abis/FarmUnlockerLMNLMD.json";
import FarmUnlockerLMNEWT from "../../abis/FarmUnlockerLMNEWT.json";
import FarmUnlockerLMDEWT from "../../abis/FarmUnlockerLMDEWT.json";
import MasterChef from "../../abis/MasterChef.json";
import testingData from "../../utils/hardCoded";
import tokenABI from "../../utils/Utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const {
  setIntervalAsync,
  clearIntervalAsync,
} = require("set-interval-async/fixed");

const Farms = () => {
  const [active, setActive] = useState(true);
  const [IsFlippedAll, setIsFlippedAll] = useState(false);

  const [Load, setLoad] = useState(true); // you can replace this with the state you have
  const [farm0Flipped, setFarm0Flipped] = useState(false); // you can replace this with the state you have
  const [farm1Flipped, setFarm1Flipped] = useState(false); // you can replace this with the state you have
  const [farm2Flipped, setFarm2Flipped] = useState(false); // you can replace this with the state you have

  const [approved0, setApproved0] = useState(false); // you can replace this with the state you have
  const [approved1, setApproved1] = useState(false); // you can replace this with the state you have
  const [approved2, setApproved2] = useState(false); // you can replace this with the state you have

  const [input0, setInput0] = useState(0);
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);

  const [balance0, setBalance0] = useState(0);
  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);

  const [stakedAmount0, setStakedAmount0] = useState(0);
  const [stakedAmount1, setStakedAmount1] = useState(0);
  const [stakedAmount2, setStakedAmount2] = useState(0);

  const [reward0, setReward0] = useState(0);
  const [reward1, setReward1] = useState(0);
  const [reward2, setReward2] = useState(0);

  const [disableUnlock0, setDisableUnlock0] = useState(false);
  const [disableUnlock1, setDisableUnlock1] = useState(false);
  const [disableUnlock2, setDisableUnlock2] = useState(false);

  const [disableApproveBtn0, setdisableApproveBtn0] = useState(false);
  const [disableApproveBtn1, setdisableApproveBtn1] = useState(false);
  const [disableApproveBtn2, setdisableApproveBtn2] = useState(false);

  const [disableBtnDeposit0, setdisableBtnDeposit0] = useState(false);
  const [disableBtnDeposit1, setdisableBtnDeposit1] = useState(false);
  const [disableBtnDeposit2, setdisableBtnDeposit2] = useState(false);

  const getMax0 = () => {
    setInput0(balance0);
  };

  const getMax1 = () => {
    setInput1(balance1);
  };

  const getMax2 = () => {
    setInput2(balance2);
  };

  const handleFlipAll = () => {
    setIsFlippedAll(!IsFlippedAll);
  };

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

  const handleWithdrawToast = () => {
    toast.success("Withdraw Success", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleWithdrawErrorToast = () => {
    toast.error("Withdraw Reverted", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUnlockToast = () => {
    toast.success("Unlock Success", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUnlockErrorToast = () => {
    toast.error("Unlock Reverted", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleApproveToast = () => {
    toast.success("Approve Success", {
      position: "top-right",
      autoClose: 5000,

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleApproveErrorToast = () => {
    toast.error("Approve Reverted", {
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

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );

          const masterChef = new web3.eth.Contract(
            MasterChef.abi,
            testingData.sushi.masterChef.address
          );

          const unlock_lmn_lmd_contract = new web3.eth.Contract(
            FarmUnlockerLMNLMD.abi,
            testingData.farmUnlock.LMN_LMD.address
          );
          const unlock_lmn_ewt_contract = new web3.eth.Contract(
            FarmUnlockerLMNEWT.abi,
            testingData.farmUnlock.LMN_EWT.address
          );
          const unlock_lmd_ewt_contract = new web3.eth.Contract(
            FarmUnlockerLMDEWT.abi,
            testingData.farmUnlock.LMD_EWT.address
          );
          console.log("AQUI");

          const pair_0 = await factory.methods
            .getPair(
              testingData.tokens.LMN.address,
              testingData.tokens.LMD.address
            )
            .call({ from: accounts[0] });
          const pair_1 = await factory.methods
            .getPair(
              testingData.tokens.LMD.address,
              testingData.tokens.WETH.address
            )
            .call({ from: accounts[0] });
          const pair_2 = await factory.methods
            .getPair(
              testingData.tokens.LMN.address,
              testingData.tokens.WETH.address
            )
            .call({ from: accounts[0] });

          const token0 = new web3.eth.Contract(Pair.abi, pair_0);
          const token1 = new web3.eth.Contract(Pair.abi, pair_1);
          const token2 = new web3.eth.Contract(Pair.abi, pair_2);

          const allo0 = await token0.methods
            .allowance(accounts[0], testingData.sushi.masterChef.address)
            .call({ from: accounts[0] });
          const allo1 = await token1.methods
            .allowance(accounts[0], testingData.sushi.masterChef.address)
            .call({ from: accounts[0] });
          const allo2 = await token2.methods
            .allowance(accounts[0], testingData.sushi.masterChef.address)
            .call({ from: accounts[0] });

          if (web3.utils.fromWei(allo0) !== "0") {
            setApproved0(true);
          }
          if (web3.utils.fromWei(allo1) !== "0") {
            setApproved1(true);
          }
          if (web3.utils.fromWei(allo2) !== "0") {
            setApproved2(true);
          }
          setLoad(false);

          console.log(Load);
          const _balance0 = await token0.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] });
          setBalance0(web3.utils.fromWei(_balance0));
          const _balance1 = await token1.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] });
          setBalance1(web3.utils.fromWei(_balance1));
          const _balance2 = await token2.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] });
          setBalance2(web3.utils.fromWei(_balance2));

          const unlocked_lmn_lmd = await unlock_lmn_lmd_contract.methods
            .unlockList(accounts[0])
            .call({ from: accounts[0] });
          const unlocked_lmn_ewt = await unlock_lmn_ewt_contract.methods
            .unlockList(accounts[0])
            .call({ from: accounts[0] });
          const unlocked_lmd_ewt = await unlock_lmd_ewt_contract.methods
            .unlockList(accounts[0])
            .call({ from: accounts[0] });

          if (unlocked_lmn_lmd === true) {
            //? User has pool unlocked
            setFarm0Flipped(true);
            const userInfo0 = await masterChef.methods
              .userInfo(0, accounts[0])
              .call({ from: accounts[0] });
            const stakeAmount0 = web3.utils.fromWei(userInfo0.amount);
            setStakedAmount0(
              Intl.NumberFormat("en-GB", {
                notation: "compact",
                compactDisplay: "short",
              }).format(stakeAmount0)
            );
            let rew0 = await masterChef.methods
              .pendingSushi(0, accounts[0])
              .call({ from: accounts[0] });

            rew0 = parseFloat(web3.utils.fromWei(rew0))
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            setReward0(rew0);
          } else {
            setFarm0Flipped(false);
          }

          if (unlocked_lmd_ewt === true) {
            //? User has pool unlocked
            setFarm1Flipped(true);
            const userInfo1 = await masterChef.methods
              .userInfo(1, accounts[0])
              .call({ from: accounts[0] });
            const stakeAmount1 = web3.utils.fromWei(userInfo1.amount);
            setStakedAmount1(
              Intl.NumberFormat("en-GB", {
                notation: "compact",
                compactDisplay: "short",
              }).format(stakeAmount1)
            );
            let rew1 = await masterChef.methods
              .pendingSushi(1, accounts[0])
              .call({ from: accounts[0] });

            rew1 = parseFloat(web3.utils.fromWei(rew1))
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            setReward1(rew1);
          } else {
            setFarm1Flipped(false);
          }

          if (unlocked_lmn_ewt === true) {
            //? User has pool unlocked
            setFarm2Flipped(true);
            const userInfo2 = await masterChef.methods
              .userInfo(2, accounts[0])
              .call({ from: accounts[0] });

            const stakeAmount2 = web3.utils.fromWei(userInfo2.amount);
            setStakedAmount2(
              Intl.NumberFormat("en-GB", {
                notation: "compact",
                compactDisplay: "short",
              }).format(stakeAmount2)
            );
            let rew2 = await masterChef.methods
              .pendingSushi(2, accounts[0])
              .call({ from: accounts[0] });

            rew2 = parseFloat(web3.utils.fromWei(rew2))
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            setReward2(rew2);
          } else {
            setFarm2Flipped(false);
          }

          //! Check Amount Staked
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const triggerUnlockPool0 = async () => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async function () {
          setDisableUnlock0(true);
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();
          const gas = new web3.utils.BN("6000000");

          const unlock_contract = new web3.eth.Contract(
            FarmUnlockerLMNLMD.abi,
            testingData.farmUnlock.LMN_LMD.address
          );

          try {
            const unlocked = await unlock_contract.methods.unlock().send({
              from: accounts[0],
              value: web3.utils.toWei("1"),
            });
            handleUnlockToast();
            setFarm0Flipped(true);
            setDisableUnlock0(false);
          } catch (e) {
            handleUnlockErrorToast();
            setDisableUnlock0(false);
            setFarm0Flipped(false);
          }
        });
      } catch (e) {
        handleUnlockErrorToast();
        setDisableUnlock0(false);
        console.log(e);
      }
    }
  };

  const triggerUnlockPool1 = async () => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setDisableUnlock1(true);

      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();
          const gas = new web3.utils.BN("6000000");

          const unlock_contract = new web3.eth.Contract(
            FarmUnlockerLMDEWT.abi,
            testingData.farmUnlock.LMD_EWT.address
          );

          try {
            const unlocked = await unlock_contract.methods.unlock().send({
              from: accounts[0],
              value: web3.utils.toWei("1"),
            });
            handleUnlockToast();
            setFarm1Flipped(true);
            setDisableUnlock1(false);
          } catch (e) {
            handleUnlockErrorToast();
            setFarm1Flipped(false);
            setDisableUnlock1(false);
          }
        });
      } catch (e) {
        handleUnlockErrorToast();
        setDisableUnlock1(false);

        console.log(e);
      }
    }
  };

  const triggerUnlockPool2 = async () => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setDisableUnlock2(true);

      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();
          const gas = new web3.utils.BN("6000000");

          const unlock_contract = new web3.eth.Contract(
            FarmUnlockerLMDEWT.abi,
            testingData.farmUnlock.LMN_EWT.address
          );

          try {
            const unlocked = await unlock_contract.methods.unlock().send({
              from: accounts[0],
              value: web3.utils.toWei("1"),
            });
            handleUnlockToast();
            setFarm2Flipped(true);
            setDisableUnlock2(false);
          } catch (e) {
            handleUnlockErrorToast();
            setFarm2Flipped(false);
            setDisableUnlock2(false);
          }
        });
      } catch (e) {
        handleUnlockErrorToast();
        setDisableUnlock2(false);
        console.log(e);
      }
    }
  };

  const approve0 = async (_address) => {
    const web3 = new Web3(window.ethereum);
    // User has allowed account access to DApp...
    setdisableApproveBtn0(true);
    const netId = await web3.eth.net.getId();

    const accounts = await web3.eth.getAccounts();
    const gas = new web3.utils.BN("6000000");

    const factory = new web3.eth.Contract(
      Factory.abi,
      testingData.swap.factory.address
    );

    const pair_address = await factory.methods
      .getPair(testingData.tokens.LMN.address, testingData.tokens.LMD.address)
      .call({
        from: accounts[0],
      });

    const pair = new web3.eth.Contract(Pair.abi, pair_address);
    try {
      const result = await pair.methods
        .approve(
          testingData.sushi.masterChef.address,
          web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1))
        )
        .send({
          from: accounts[0],
        });
      handleApproveToast();
      setApproved0(true);
      setdisableApproveBtn0(false);
    } catch (e) {
      handleApproveErrorToast();
      setdisableApproveBtn0(false);
      console.log(e);
    }

    //* ADD new pool TOKEN
    // else if (_address === testingData.address.OTHER_TOKEN.address) {
    //   setAllowed1(true)
    // }
  };

  const approve1 = async (_address) => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          setdisableApproveBtn1(true);

          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();
          const gas = new web3.utils.BN("6000000");

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );

          const pair_address = await factory.methods
            .getPair(
              testingData.tokens.LMD.address,
              testingData.tokens.WETH.address
            )
            .call({ from: accounts[0] });

          const pair = new web3.eth.Contract(Pair.abi, pair_address);

          await pair.methods
            .approve(
              testingData.sushi.masterChef.address,
              web3.utils
                .toBN(2)
                .pow(web3.utils.toBN(256))
                .sub(web3.utils.toBN(1))
            )
            .send({
              from: accounts[0],
            });

          setApproved1(true);
          setdisableApproveBtn1(false);

          handleApproveToast();

          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        setdisableApproveBtn1(false);
        handleApproveErrorToast();
        console.log(e);
      }
    }
  };

  const approve2 = async (_address) => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async function () {
          setdisableApproveBtn2(true);

          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId();

          const accounts = await web3.eth.getAccounts();
          const gas = new web3.utils.BN("6000000");

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );

          const pair_address = await factory.methods
            .getPair(
              testingData.tokens.LMN.address,
              testingData.tokens.WETH.address
            )
            .call({ from: accounts[0] });

          const pair = new web3.eth.Contract(Pair.abi, pair_address);

          await pair.methods
            .approve(
              testingData.sushi.masterChef.address,
              web3.utils
                .toBN(2)
                .pow(web3.utils.toBN(256))
                .sub(web3.utils.toBN(1))
            )
            .send({
              from: accounts[0],
            });
          handleApproveToast();
          setApproved2(true);
          setdisableApproveBtn2(false);

          //* ADD new pool TOKEN
          // else if (_address === testingData.address.OTHER_TOKEN.address) {
          //   setAllowed1(true)
          // }
        });
      } catch (e) {
        setdisableApproveBtn2(false);
        handleApproveErrorToast();
        console.log(e);
      }
    }
  };

  const deposit0 = async () => {
    setdisableBtnDeposit0(true);
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

          const factory = new web3.eth.Contract(
            Factory.abi,
            testingData.swap.factory.address
          );
          const pair_address = await factory.methods
            .getPair(
              testingData.tokens.LMN.address,
              testingData.tokens.LMD.address
            )
            .call({ from: accounts[0] });

          const pair_contract = new web3.eth.Contract(Pair.abi, pair_address);

          const allowance = await pair_contract.methods
            .allowance(accounts[0], testingData.sushi.masterChef.address)
            .call({ from: accounts[0] });

          try {
            await masterChef.methods
              .deposit(0, web3.utils.toWei(input0.toString()))
              .send({
                from: accounts[0],
              });
            handleToast();
            await getBlockData();
            setdisableBtnDeposit0(false);

            setInput0("");
          } catch (e) {
            handleErrorToast();
            setdisableBtnDeposit0(false);

            console.log(e);
          }
        });
      } catch (e) {
        setdisableBtnDeposit0(false);
        handleErrorToast();

        console.log(e);
      }
    }
  };

  const deposit1 = async () => {
    setdisableBtnDeposit1(true);
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
            const unlocked = await masterChef.methods
              .deposit(1, web3.utils.toWei(input1.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
            handleToast();

            await getBlockData();
            setdisableBtnDeposit1(false);

            setInput1("");
          } catch (e) {
            handleErrorToast();
            setdisableBtnDeposit1(false);

            console.log(e);
          }
        });
      } catch (e) {
        setdisableBtnDeposit1(false);
        handleErrorToast();
        console.log(e);
      }
    }
  };

  const deposit2 = async () => {
    setdisableBtnDeposit2(true);
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
            const unlocked = await masterChef.methods
              .deposit(2, web3.utils.toWei(input2.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
            handleToast();
            await getBlockData();
            setInput2("");
            setdisableBtnDeposit2(false);
          } catch (e) {
            handleErrorToast();
            setdisableBtnDeposit2(false);

            console.log(e);
          }
        });
      } catch (e) {
        setdisableBtnDeposit2(false);
        handleErrorToast();
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

          try {
            await masterChef.methods
              .withdraw(0, web3.utils.toWei(input0.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
            await getBlockData();
            handleWithdrawToast();
            setInput0("");
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
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
            .userInfo(0, accounts[0])
            .call();

          const allAmount = stakedAmount.amount;

          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);

          try {
            await masterChef.methods.withdraw(0, allAmount).send({
              from: accounts[0],
              gas: gas,
            });
            await getBlockData();
            setInput0("");
            handleWithdrawToast();
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
        console.log(e);
      }
    }
  };

  const withdraw1 = async () => {
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
              .withdraw(1, web3.utils.toWei(input1.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
            handleWithdrawToast();

            await getBlockData();
            setInput1("");
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
        console.log(e);
      }
    }
  };

  const withdraw1All = async () => {
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
            .userInfo(1, accounts[0])
            .call();

          const allAmount = stakedAmount.amount;

          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);

          try {
            await masterChef.methods.withdraw(1, allAmount).send({
              from: accounts[0],
              gas: gas,
            });
            handleWithdrawToast();
            await getBlockData();
            setInput1("");
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
        console.log(e);
      }
    }
  };

  const withdraw2 = async () => {
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
              .withdraw(2, web3.utils.toWei(input2.toString()))
              .send({
                from: accounts[0],
                gas: gas,
              });
            handleWithdrawToast();
            await getBlockData();
            setInput2("");
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
        console.log(e);
      }
    }
  };

  const withdraw2All = async () => {
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
            .userInfo(2, accounts[0])
            .call();

          const allAmount = stakedAmount.amount;

          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);
          console.log(allAmount);

          try {
            await masterChef.methods.withdraw(2, allAmount).send({
              from: accounts[0],
              gas: gas,
            });
            handleWithdrawToast();
            await getBlockData();
            setInput2("");
          } catch (e) {
            handleWithdrawErrorToast();
            console.log(e);
          }
        });
      } catch (e) {
        handleWithdrawErrorToast();
        console.log(e);
      }
    }
  };

  const fetchRewards = async () => {
    const web3 = new Web3(window.ethereum);
    // User has allowed account access to DApp...
    const netId = await web3.eth.net.getId();

    const accounts = await web3.eth.getAccounts();
    const gas = new web3.utils.BN("6000000");

    try {
      const masterChef = new web3.eth.Contract(
        MasterChef.abi,
        testingData.sushi.masterChef.address
      );

      try {
        const pdtSushi0 = await masterChef.methods
          .pendingSushi(0, accounts[0])
          .call({ from: accounts[0] });
        let pdt0 = web3.utils.fromWei(pdtSushi0);
        pdt0 = parseFloat(pdt0);

        if (pdt0 !== undefined && pdt0 !== reward0) {
          const rew = parseFloat(web3.utils.fromWei(pdtSushi0))
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          setReward0(rew);
        }
      } catch (e) {
        console.log("E: Fetch Rewards Farm0");
      }
      try {
        const pdtSushi1 = await masterChef.methods
          .pendingSushi(1, accounts[0])
          .call({ from: accounts[0] });
        let pdt1 = web3.utils.fromWei(pdtSushi1);
        pdt1 = parseFloat(pdt1);
        if (pdt1 !== undefined && pdt1 !== reward1) {
          const rew0 = parseFloat(web3.utils.fromWei(pdtSushi1))
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          setReward1(rew0);
        }
      } catch (e) {
        console.log("E: Fetch Rewards Farm1");
      }
      try {
        const pdtSushi2 = await masterChef.methods
          .pendingSushi(2, accounts[0])
          .call({ from: accounts[0] });
        let pdt2 = web3.utils.fromWei(pdtSushi2);
        pdt2 = parseFloat(pdt2);
        if (pdt2 !== undefined && pdt2 !== reward2) {
          const rew0 = parseFloat(web3.utils.fromWei(pdtSushi2))
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          setReward2(rew0);
        }
      } catch (e) {
        console.log("E: Fetch Rewards Farm2");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  useEffect(() => {
    const timer = setIntervalAsync(async () => {
      const resp = await fetchRewards();
      console.log("NEW Iteration");
    }, 2000);
    return async () => await clearIntervalAsync(timer);
  }, []);

  return (
    <div className="farms-page">
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
      <Top title="Farms" />
      <p className="title-p"> Stake LP tokens to earn LMN </p>{" "}
      <div className="farms-main">
        <div className="farms-filters">
          <div className="stake-filter" onClick={handleFlipAll}>
            <span> Discover All </span>{" "}
            <Toggle className="stake-toggle" icons={false} />{" "}
          </div>{" "}
          <div onClick={(e) => setActive(!active)} className="state-filter">
            <span
              style={{
                backgroundColor: active ? "#60DF00" : "transparent",
                color: active ? "#FFFFFF" : "#959595",
              }}
            >
              Active{" "}
            </span>{" "}
            <span
              style={{
                backgroundColor: active ? "transparent" : "#60DF00",
                color: active ? "#959595" : "#FFFFFF",
              }}
            >
              Inactive{" "}
            </span>{" "}
          </div>{" "}
          {/* <div className="search-filter">
                        <input type="text" placeholder="Search Farms" />
                        <img src={Search} alt="" />
                      </div>
                      <div className="select-filter">
                        <select name="" id="">
                          <option value="hot">hot</option>
                        </select>
                        <span>Sort By</span>
                        <img src={Arrow} alt="" />
                      </div> */}{" "}
        </div>{" "}
        <div className="horizontal-line"> </div>{" "}
      </div>
      {!active ? (
        Load ? (
          <div
            style={{ display: "flex", height: "68vh", alignItems: "center" }}
          >
            <div class="loader">
              <div class="outer"></div>
              <div class="middle"></div>
              <div class="inner"></div>
            </div>
          </div>
        ) : (
          <div className="farms-container"> </div>
        )
      ) : Load ? (
        <div style={{ display: "flex", height: "68vh", alignItems: "center" }}>
          <div class="loader">
            <div class="outer"></div>
            <div class="middle"></div>
            <div class="inner"></div>
          </div>
        </div>
      ) : (
        <div className="farms-container">
          <Farm
            firstCoinImg={LMN}
            secondCoinImg={LMD}
            firstCoinName={"LMN"}
            secondCoinName={"LMD"}
            handleFlip={handleFlipAll}
            isFlipped={farm0Flipped}
            unlock={triggerUnlockPool0}
            approved={approved0}
            approve={approve0}
            getMax={getMax0}
            setValue={setInput0}
            inputValue={input0}
            deposit={deposit0}
            stakedAmount={stakedAmount0}
            rewards={reward0}
            withdraw={withdraw0}
            withdrawAll={withdraw0All}
            balance={balance0}
            disableUnlock={disableUnlock0}
            disableApproveBtn={disableApproveBtn0}
            disableDepositBtn={disableBtnDeposit0}
            farmN={0}
          />{" "}
          <Farm
            firstCoinImg={LMD}
            secondCoinImg={EWT}
            firstCoinName={"LMD"}
            secondCoinName={"EWT"}
            handleFlip={handleFlipAll}
            isFlipped={farm1Flipped}
            unlock={triggerUnlockPool1}
            approved={approved1}
            approve={approve1}
            getMax={getMax1}
            setValue={setInput1}
            inputValue={input1}
            deposit={deposit1}
            stakedAmount={stakedAmount1}
            rewards={reward1}
            withdraw={withdraw1}
            withdrawAll={withdraw1All}
            balance={balance1}
            disableUnlock={disableUnlock1}
            disableApproveBtn={disableApproveBtn1}
            disableDepositBtn={disableBtnDeposit1}
            farmN={1}
          />{" "}
          <Farm
            firstCoinImg={LMN}
            secondCoinImg={EWT}
            firstCoinName={"LMN"}
            secondCoinName={"EWT"}
            handleFlip={handleFlipAll}
            isFlipped={farm2Flipped}
            unlock={triggerUnlockPool2}
            approved={approved2}
            approve={approve2}
            getMax={getMax2}
            setValue={setInput2}
            inputValue={input2}
            deposit={deposit2}
            stakedAmount={stakedAmount2}
            rewards={reward2}
            withdraw={withdraw2}
            withdrawAll={withdraw2All}
            balance={balance2}
            disableUnlock={disableUnlock2}
            disableApproveBtn={disableApproveBtn2}
            disableDepositBtn={disableBtnDeposit2}
            farmN={2}
          />{" "}
          {/* <Farm
                                firstCoinImg={LMN}
                                secondCoinImg={USDT}
                                firstCoinName={'LMN'}
                                secondCoinName={'USDT'}
                              /> */}{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default Farms;
