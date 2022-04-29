import React, { useState } from "react";
import Top from "../Top/Top";
import Set from "../../assets/exchange-set.svg";
import Transfer from "../../assets/transfer.svg";
import Select from "react-select";
import Arrow from "../../assets/arrow.svg";
import SelectModal from "../SelectModal/SelectModal";
import Modal from "react-modal";
import "../Exchange/Exchange.scss";
import EWT from "../../assets/EWT.svg";
import { Link } from "react-router-dom";

const PoolImport = () => {
	let subtitle;
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalIsOpen2, setIsOpen2] = useState(false);
	const [modalIsOpen3, setIsOpen3] = useState(false);
	const [coinImg, setcoinImg] = useState(EWT);
	const [coinName, setcoinName] = useState("EWT");
	const [coinImg2, setcoinImg2] = useState(EWT);
	const [coinName2, setcoinName2] = useState("EWT");
	const [Slippage, setSlippage] = useState("Auto");
	const [SlippageRaw, setSlippageRaw] = useState();

	function openModal() {
		setIsOpen(true);
	}

	const handleSlippageChange = (e) => {
		setSlippageRaw(e.target.value);
		setSlippage(SlippageRaw);
	};

	function closeModalSet() {
		setIsOpen3(false);
	}

	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				margin: "0",
				padding: "0",
				overflowX: "hidden",
				background: "  #6e6e6e",
			}}
			className='exchange-page'
		>
			<SelectModal
				setcoinImg={setcoinImg}
				setcoinName={setcoinName}
				setIsOpen={setIsOpen}
				modalIsOpen={modalIsOpen}
			/>
			<SelectModal
				setcoinImg={setcoinImg2}
				setcoinName={setcoinName2}
				setIsOpen={setIsOpen2}
				modalIsOpen={modalIsOpen2}
			/>
		<Modal
				isOpen={modalIsOpen3}
				onRequestClose={closeModalSet}
				contentLabel='Example Modal'
				className='set-modal'
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
				<div className='modal-head'>
					<div className='modal-title'>
						<h4>Transaction Settings</h4>
					</div>
					<span>Slippage Tolerance</span>
					<div className='slippage'>
						<button
							style={{
								background:
									Slippage === "Auto"
										? "linear-gradient( 90deg, rgba(216, 223, 0, 1) 0%, rgba(96, 223, 0, 1) 100%)"
										: "",
							}}
							onClick={() => setSlippage("Auto")}
						>
							Auto
						</button>
						<div style={{ position: "relative" }}>
							<input
								type='number'
								placeholder='2.0'
								onChange={handleSlippageChange}
							/>
							<span>%</span>
						</div>
					</div>
					<span>Transaction Deadline</span>
					<div className='transaction-deadline'>
						<input type='number' /> <span>minutes</span>
					</div>
				</div>
			</Modal>

			<div className='exchange-main'>
				<div style={{ marginRight: "0" }} className='exchange-box'>
					<div className='exchange-box-top'>
						<Link to="/liquidity">
							<img
								src={Arrow}
								style={{ transform: "rotate(90deg)", cursor: "pointer" }}
								alt=''
							/>
						</Link>
						<span>Import Pool</span>
						<img
							src={Set}
							className='exchange-setting'
							onClick={() => setIsOpen3(true)}
						/>
					</div>
					<div
						style={{
							display: "flex",
							fontSize: "21px",
							alignItems: "center",
							padding: "3px 10px",
							borderRadius: "25px",
							background: "#61df003f",
							marginBottom: "25px",
							marginTop: "25px",
						}}
					>
						<p>
							{" "}
							<font size='+2'>Tip:</font> Use this tool to find pairs that don't
							automatically appear in the interface.
						</p>
					</div>
					<form className='exchange-form'>
						<div
							className='form-bot'
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center",
							}}
							onClick={openModal}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<div style={{ display: "flex", alignItems: "center" }}>
									<img
										style={{ width: "32px", marginRight: "10px" }}
										src={coinImg}
										alt=''
									/>{" "}
									<span>{coinName}</span>{" "}
								</div>
								<img style={{ marginLeft: "10px" }} src={Arrow} alt='' />
							</div>
						</div>
					</form>
					<span
						style={{ fontSize: "32px", cursor: "default" }}
						className='transfer-btwn'
					>
						{" "}
						+{" "}
					</span>
					<form className='exchange-form'>
						<div
							className='form-bot'
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								alignItems: "center",
							}}
							onClick={(e) => setIsOpen2(true)}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<div style={{ display: "flex", alignItems: "center" }}>
									<img
										style={{ width: "32px", marginRight: "10px" }}
										src={coinImg2}
										alt=''
									/>{" "}
									<span>{coinName2}</span>{" "}
								</div>
								<img style={{ marginLeft: "10px" }} src={Arrow} alt='' />
							</div>
						</div>
					</form>
					<div
						style={{
							display: "flex",
							fontSize: "21px",
							alignItems: "center",
							justifyContent: "center",
							padding: "3px 10px",
							borderRadius: "25px",
							background: "#61df003f",
							marginBottom: "25px",
							marginTop: "25px",
						}}
					>
						<p> Select a token to find your liquidity.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PoolImport;
