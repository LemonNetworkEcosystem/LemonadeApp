import React from "react";
import nft from "../../assets/nft1.png";
import chain from "../../assets/e-chain.svg";
const MarketNft = () => {
	return (
		<div className='nft-live'>
			<div className='nft-box-top'>
				<div className='chain'>
					<img src={chain} alt='' />
					<span>E-Chain</span>
				</div>
                <span>2134</span>
			</div>
			<img src={nft} alt='' />
			<div className='nft-box-bot'>
				<span>Where the love intimates</span>
				<div className="bid">
                    <span>Last Bid</span>
                    <span>LMN10</span>
                </div>
			</div>
		</div>
	);
};

export default MarketNft;
