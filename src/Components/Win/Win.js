import React from "react";
import Lotto from "../Lotto/Lotto"
import Top from "../Top/Top"
import "./Win.scss"
const Win = () => {
	const minWidth = window.innerWidth; 
	return (
		<div className='win-page'>
			{minWidth < 850 ? <Top/> : ""}
			<Lotto />
		</div>
	);
};

export default Win;
