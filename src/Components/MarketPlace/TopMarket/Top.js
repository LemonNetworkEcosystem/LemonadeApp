import React from "react";
import { Link } from "react-router-dom";
import "./Top.scss";
import Lines from "../../../assets/nav-line.svg";
import wallet from "../../../assets/firepulse-green.svg";
const TopMarket = (props) => {
	const winWidth = window.innerWidth;

	return (
		<div className='top'>
			{winWidth < 1600 ? (
				<Link to={"/navbar"}> 
					<div className='lines'>
						<img src={Lines} alt='' />
					</div>
				</Link>
			) : (
				""
			)}

			<h1 className='title'>{props.title}</h1>
			<div className='top-right'>
				<select>
					<option value='eng'>EN</option>
				</select>
				<Link to={"/create-nft"} style={{ textDecoration: "none" }}>
					{winWidth > 1600 ? (
						<button>
							<div>Create</div>
						</button>
					) : (
						<div className='fire-pulse'>
							<img src={wallet} alt='' />
						</div>
					)}
				</Link>
			</div>
		</div>
	);
};

export default TopMarket;
