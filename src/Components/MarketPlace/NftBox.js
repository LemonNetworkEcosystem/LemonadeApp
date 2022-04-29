import React from "react";
import nft from "../../assets/nft1.png"
import chain from "../../assets/e-chain.svg"
const NftBox = () => {
	return <div className='nft-box'>
        <div className="nft-box-top">
            <img src={chain} alt="" />
            <span>E-Chain</span>
        </div>
        <img src={nft} alt="" />
        <div className="nft-box-bot">
            <span>Where the love intimates</span>
            <span>LMN50</span>
        </div>
    </div>;
};

export default NftBox;
