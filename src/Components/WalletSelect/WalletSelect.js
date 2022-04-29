import React from "react";
import metaLogo from "../../assets/metamask-logo.svg";
import coinbaseLogo from "../../assets/coinbase-logo.svg";
import connectLogo from "../../assets/walletconnect-logo.svg";
import Arrow from "../../assets/arrow.svg";
import { Link } from "react-router-dom";
import "./WalletSelect.scss";
const WalletSelect = () => {
	return (
		<div className='wallet-page'>
			<div className='wallet-container'>
				<Link to={"/"}>
					<img className='back-arrow' src={Arrow} alt='' />
				</Link>
				<button className='wallet-box'>
					<span>MetaMask</span>
					<img src={metaLogo} alt='' />
				</button>
				<button className='wallet-box'>
					<span>Wallet Connect</span>
					<img src={connectLogo} alt='' />
				</button>
				<button className='wallet-box'>
					<span>Coinbase Wallet</span>
					<img src={coinbaseLogo} alt='' />
				</button>
			</div>
		</div>
	);
};

export default WalletSelect;
