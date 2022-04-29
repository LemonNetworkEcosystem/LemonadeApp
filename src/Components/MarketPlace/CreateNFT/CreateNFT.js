import React from "react";
import "./CreateNFT.scss";
import { Link } from "react-router-dom";
import cube from "../../../assets/cube.png";
import multiple from "../../../assets/multiple.png";
import square from "../../../assets/four-square.png";
import bulk from "../../../assets/bulk.png";
import back from "../../../assets/back-arrow.png";
const CreateNFT = () => {
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
					<p>
						Choose “Single” if you want your collectible to be one of a kind or
						“Multiple” if you want to sell one <br /> collectible multiple times
					</p>
					<div className='collectible-containers'>
						<Link
							to='/upload-nft'
							style={{ textDecoration: "none", color: "#44444" }}
						>
							<div className='collectible'>
								<img src={cube} alt='' />
								<span>Single</span>
							</div>
						</Link>
						<Link
							to='/upload-nft'
							style={{ textDecoration: "none", color: "#44444" }}
						>
							<div className='collectible'>
								<img src={multiple} alt='' />
								<span>Multiple</span>
							</div>
						</Link>

						<Link
							to='/upload-nft'
							style={{ textDecoration: "none", color: "#44444" }}
						>
							<div className='collectible'>
								<img src={bulk} alt='' />
								<span>Bulk</span>
							</div>
						</Link>

						<Link
							to='/upload-nft'
							style={{ textDecoration: "none", color: "#44444" }}
						>
							<div className='collectible'>
								<img src={square} alt='' />
								<span>Business</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateNFT;
