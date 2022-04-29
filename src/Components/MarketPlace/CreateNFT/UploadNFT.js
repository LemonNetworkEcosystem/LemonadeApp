import React, { useState } from "react";
import "./CreateNFT.scss";
import { Link } from "react-router-dom";
import cube from "../../../assets/cube.png";
import multiple from "../../../assets/multiple.png";
import square from "../../../assets/four-square.png";
import bulk from "../../../assets/bulk.png";
import back from "../../../assets/back-arrow.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calicon from "../../../assets/calendar-icon.svg";
const UploadNFT = () => {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<div className='create'>
			<h3>Create NFT</h3>
			<div className='create-box'>
				<div className='create-subbox'>
					<Link to='/market-place'>
						<div className='back'>
							<img src={back} alt='' />
							<span>Back</span>
						</div>
					</Link>
					<p style={{ marginTop: "0", marginBottom: "20px" }}>
						Enter the following information related to your NFT
					</p>
					<form action='submit'>
						<div className='upload-box'>
							<input type='file' name='' accept="image/png, image/jpeg" id='' title='' />
							<label>Upload NFT</label>
						</div>
						<input
							className='nft-title'
							type='text'
							placeholder='Enter Title'
						/>
						<textarea className="nft-desc" style={{resize:"none"}} placeholder="Enter Description"   cols="30" rows="7"></textarea>
						<div className='nft-calendar'>
							<div className='date-picker'>
								<DatePicker
									className='calendar'
									onChange={(date) => setStartDate(date)}
									placeholderText='From'
								/>
								<img src={calicon} alt='' />
							</div>
							<div className='calendar-line'></div>
							<div className='date-picker'>
								<DatePicker
									className='calendar'
									onChange={(date) => setStartDate(date)}
									placeholderText='To'
								/>
								<img src={calicon} alt='' />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UploadNFT;
