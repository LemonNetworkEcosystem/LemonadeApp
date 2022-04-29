import React, { useState } from "react";
import TopMarket from "./TopMarket/Top";
import "./MarketPlace.scss";
import Lines from "../../assets/nav-line.svg";
import { Link } from "react-router-dom";
import bg from "../../assets/market-bg.png";
import ScrollContainer from "react-indiana-drag-scroll";
import NftBox from "./NftBox";
import LiveAuction from "./LiveAuction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CloseAuction from "./CloseAuction";
import NFTMarket from "./NFTMarket";
import Lemonade3D1 from "../../assets/lemonade3D1.png";
import Lemonade3D2 from "../../assets/lemonade3D2.png";
import Navbar from "../Navbar/Navbar";

const MarketPlace = () => {
	const [route, setRoute] = useState("live");
	return (
		<div className='market-page'>
			<TopMarket title='Market Place' />
			<div className='market-main'>
				<div className='market-hero-box'>
					<div className='nav'>
						<Link to={"/navbar"} className='lines-link'>
							<div className='lines'>
								<img src={Lines} alt='' />
							</div>{" "}
						</Link>{" "}
						<Navbar />
					</div>{" "}
					<div className='overlay'>
						<span> We Are Working On It </span>{" "}
						<div className='wrap'>
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
							<img src={Lemonade3D2} alt='' className='logo' />
							<img src={Lemonade3D1} alt='' className='logo' />
						</div>{" "}
					</div>{" "}
					<div className='market-hero-left'>
						<h3>
							<span> Discover </span> <br /> the rarest NFTs{" "}
						</h3>{" "}
						<p>
							Welcome to Lemonade NFT.The well awaited <br /> solution for NFT
							minting.This network is about to <br /> take the NFT game to next
							level{" "}
						</p>{" "}
						<button>
							<div> Discover </div>{" "}
						</button>{" "}
					</div>{" "}
					<div className='market-hero-right'>
						<img src={bg} alt='' />
						<ScrollContainer className='nft-container'>
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
							<NftBox />
						</ScrollContainer>{" "}
					</div>{" "}
				</div>{" "}
				<div className='market-sub-box'>
					<div className='market-sub-box-bg'> </div>{" "}
					<nav>
						<ul>
							<div
								className='line'
								style={{
									transform:
										route === "close"
											? "translateX(240px)"
											: route === "market"
											? "translateX(492px)"
											: "",
								}}
							></div>
							<li
								onClick={() => setRoute("live")}
								style={{ color: route === "live" ? "#60DF00" : "" }}
							>
								Live Auction{" "}
							</li>{" "}
							<li
								onClick={() => setRoute("close")}
								style={{ color: route === "close" ? "#60DF00" : "" }}
							>
								Close Auction{" "}
							</li>{" "}
							<li
								onClick={() => setRoute("market")}
								style={{ color: route === "market" ? "#60DF00" : "" }}
							>
								Market Place{" "}
							</li>{" "}
						</ul>{" "}
					</nav>{" "}
					<ScrollContainer className='nft-container'>
						{" "}
						{route === "live" ? (
							<LiveAuction />
						) : (
							<div>
								{" "}
								{route === "close" ? <CloseAuction /> : <NFTMarket />}{" "}
							</div>
						)}{" "}
					</ScrollContainer>{" "}
				</div>{" "}
			</div>{" "}
		</div>
	);
};

export default MarketPlace;
