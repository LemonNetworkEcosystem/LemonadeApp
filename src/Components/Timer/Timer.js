import React, { useEffect, useState } from "react";
import dots from "../../assets/dots.png"
import "./Timer.scss";

function Timer() {
	const calculateTimeLeft = () => {
		let year = 2023;
		let difference = +new Date(`02/08/${year}`) - +new Date();

		let timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	const leftDays = timeLeft.days,
		days = [],
		sDays = leftDays.toString();
	for (let i = 0, len = sDays.length; i < len; i += 1) {
		days.push(+sDays.charAt(i));
	}

	const leftHours = timeLeft.hours,
		hours = [],
		sHours = leftHours.toString();
	for (let i = 0, len = sHours.length; i < len; i += 1) {
		hours.push(+sHours.charAt(i));
	}

	const leftMins = timeLeft.minutes,
		mins = [],
		sMins = leftMins.toString();
	for (let i = 0, len = sMins.length; i < len; i += 1) {
		mins.push(+sMins.charAt(i));
	}

	const leftSeconds = timeLeft.seconds,
		seconds = [],
		sSeconds = leftSeconds.toString();
	for (let i = 0, len = sSeconds.length; i < len; i += 1) {
		seconds.push(+sSeconds.charAt(i));
	}

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});

	return (
		<div className='timer' data-date='2022/08/02'>
			<div className='time-display'>
				<div className="time-container">
					{days.map((day) => (
						<span className='time-number'>
							{timeLeft.days < 10 ? (
								<div>
									<span>0</span> <span>{day}</span>
								</div>
							) : (
								<span>{day}</span>
							)}
						</span>
					))}
				</div>
				<font color='grey'>days</font>
			</div>
			<div className='time-display'>
				<div className="time-container"> 
					{hours.map((hour) => (
						<span className='time-number'>
							{timeLeft.hours < 10 ? (
								<div>
									<span>0</span> <span>{hour}</span>
								</div>
							) : (
								<span>{hour}</span>
							)}
						</span>
					))}
				</div>
				<font color='grey'>hours</font>
			</div>
			<span className="first-dots"><img src={dots} alt="" /></span>
			<div className='time-display'>
				<div className="time-container">
					{mins.map((min) => (
						<span className='time-number'>
							{timeLeft.minutes < 10 ? (
								<div>
									<span>0</span> <span>{min}</span>
								</div>
							) : (
								<span>{min}</span>
							)}
						</span>
					))}
				</div>
				<font color='grey'>minutes</font>
			</div>
			<span className="dots"><img src={dots} alt="" /></span>
			<div className='time-display '>
				<div className="time-container">
					{seconds.map((second) => (
						<span className='time-number'>
							{timeLeft.seconds < 10 ? (
								<div>
									<span>0</span> <span>{second}</span>
								</div>
							) : (
								<span>{second}</span>
							)}
						</span>
					))}
				</div>
				<font color='#959595'> seconds</font>
			</div>
		</div>
	);
}

export default Timer;
