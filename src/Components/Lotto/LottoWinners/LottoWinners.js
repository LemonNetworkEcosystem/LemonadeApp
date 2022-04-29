import React from "react";
import "./LottoWinners.scss";
import picture1 from "../../../assets/picture1.png";
const LottoWinners = (props) => {
	return (
		<div className='winners'>
			<div className='winners-container'>
				<span>{props.month} Winner</span>
				<span className='number'>{props.earned}</span>
				<div className='winners-display'>
					<img src={props.avatar} alt='' />
					<span>{props.id}</span>
				</div>
				<div className='comment'>
					<p>
						{props.lastWinner === "false" ? (
							props.comment
						) : (
							<span>Reward Not Yet Claimed</span>
						)}
					</p>
					{props.lastWinner === "false" ? (
						<a className='read-more-text'>Read More</a>
					) : (
						<div>
							{" "}
							<button className='claim-btn'>It's Me, Claim Now</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LottoWinners;
