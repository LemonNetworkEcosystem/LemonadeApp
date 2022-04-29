import React, { useState } from "react";
import "./Lotto.scss";
import Timer from "../Timer/Timer";
import LottoWinners from "./LottoWinners/LottoWinners";
import avatar from "../../assets/lemonade.svg";
import EWT from "../../assets/EWT.png";
import ticketLogo from "../../assets/ticket-green.png";
import ScrollContainer from "react-indiana-drag-scroll";

const Lotto = () => {
	const [ticket, setTicket] = useState("0");
	return (
		<div className='lotto'>
			<div className='lotto-hero'>
				<div className='lotto-hero-container'>
					<div className='ticket-below'>
						<span style={{ marginRight: "10px" }}>
							1<img src={ticketLogo} alt='' />
						</span>
						<span>
							= 1 <img src={EWT} alt='' />
						</span>
					</div>

					<span className='lotto-ticket-show'>
						Tickets Purchased: 5 <img src={ticketLogo} alt='' />
					</span>
					<span className='lotto-dolar'>$ 10,00</span>
					<span className='title'>The Lemonade Lottery</span>
					<span className='number'>
						$123,345 <img src={EWT} alt='' />
					</span>
					<span className='prize'>Grand Prize!</span>
					<span className='timer-text'>Will be awarded in</span>
					<div className='timer'>
						<Timer />
					</div>
					<div className='lotto-input'>
						<div className='ticket-count'>
							<button onClick={(e) => setTicket("1")}>1X</button>
							<button onClick={(e) => setTicket("5")}>5X</button>
							<button onClick={(e) => setTicket("10")}>10X</button>
							<button onClick={(e) => setTicket("20")}>20X</button>
						</div>
					</div>
					<button className="more-info-btn">More Info</button>

				</div>
			</div>
			<ScrollContainer className='lotto-winners'>
				<LottoWinners
					avatar={avatar}
					earned='$88,725.67'
					id='0X7hf23487ghf327h3'
					comment='I had never won a lottery or indeed anything in my life and I just hit the jackpot. Gosh, I am so excited. There is just so much I wanted in my I life'
					month='October'
					lastWinner='false'
				/>
				<LottoWinners
					avatar={avatar}
					earned='$88,725.67'
					id='0X7hf23487ghf327h3'
					comment='I had never won a lottery or indeed anything in my life and I just hit the jackpot. Gosh, I am so excited. There is just so much I wanted in my I life'
					month='October'
					lastWinner='false'
				/>
				<LottoWinners
					avatar={avatar}
					earned='$88,725.67'
					id='0X7hf23487ghf327h3'
					comment='I had never won a lottery or indeed anything in my life and I just hit the jackpot. Gosh, I am so excited. There is just so much I wanted in my I life'
					month='October'
					lastWinner='false'
				/>
				<LottoWinners
					avatar={avatar}
					earned='$88,725.67'
					id='0X7hf23487ghf327h3'
					comment='I had never won a lottery or indeed anything in my life and I just hit the jackpot. Gosh, I am so excited. There is just so much I wanted in my I life'
					month='October'
					lastWinner='false'
				/>
				{/* //! OPEN WINNER TO WITHDRAW */}
				{/* <LottoWinners
          avatar={avatar}
          earned="$88,725.67"
          id="0X7hf23487ghf327h3"
          comment="I had never won a lottery or indeed anything in my life and I just hit the jackpot. Gosh, I am so excited. There is just so much I wanted in my I life"
          month="October"
          lastWinner="true"
        /> */}
			</ScrollContainer>
		</div>
	);
};

export default Lotto;
