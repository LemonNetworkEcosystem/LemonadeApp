import { React, useState, useEffect } from "react";

import Web3 from "web3";

import { Link } from "react-router-dom";
import "./Top.scss";
import Lines from "../../assets/nav-line.svg";
import wallet from "../../assets/firepulse-green.svg";

const Top = (props) => {
  const [account, setAccount] = useState("");
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

          // setConnected(true);

          const accounts = await web3.eth.getAccounts();

          setAccount(accounts[0]);

          // TODO: Remove
          // const lmnBal = await lmnContract.methods.balanceOf(accounts[0]).call({
          //   from: accounts[0],
          // })
          // setLmnWallet(web3.utils.fromWei(lmnBal))
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }

    //load contracts
  };

  useEffect(async () => {
    await getBlockData();
  }, []);

  return (
    <div className="top">
      <Link to={"/navbar"} className="lines-link">
        <div className="lines">
          <img src={Lines} alt="" />
        </div>
      </Link>

      <h1 className="title">{props.title}</h1>
      <div className="top-right">
        <select>
          <option value="eng">EN</option>
        </select>

        {account === "" ? (
          <button className="connect-button">
            <div>Connect</div>
          </button>
        ) : (
          <button className="connect-button">
            <div>
              <i>
                {account.substring(0, 6)} ***{" "}
                {account.substr(account.length - 6)}
              </i>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Top;
