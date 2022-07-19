import { useAppSelector } from '../hooks/redux';
import {
	useGetAccDataQuery,
	useGetMatchHistoryDataQuery,
	useGetMmrDataQuery,
} from '../store/valorant/valorant.api';
import './accountDetails.scss';
import './loader.scss';
import AccountMMR from './AccountMMR';
import AccountMatchHistory from './AccountMatchHistory';
import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useActions } from '../hooks/actions';

const AccountDetails: React.FC = () => {
	const { username, tag } = useAppSelector(state => state.account);

	const { isLoading, isError, data } = useGetAccDataQuery(`${username}#${tag}`);

	const {
		isLoading: isMmrLoading,
		isError: isMmrError,
		data: mmrData,
	} = useGetMmrDataQuery(`${username}#${tag}`);

	const {
		isLoading: isMatchHistoryLoading,
		isError: isMatchHistoryError,
		data: matchHistoryData,
	} = useGetMatchHistoryDataQuery(`${username}#${tag}`);

	const handleMmrDataClick = () => {
		setShowMatchHistoryData(false);
		setShowMmrData(!showMmrData);
	};
	const handleMatchHistoryDataClick = () => {
		setShowMmrData(false);
		setShowMatchHistoryData(!showMatchHistoryData);
	};

	const [showMmrData, setShowMmrData] = useState(false);
	const transitionMmr = useTransition(showMmrData, {
		from: {
			opacity: 0,
			x: -100,
		},
		enter: {
			opacity: 1,
			x: 0,
		},
		leave: {
			opacity: 0,
			x: 100,
		},
	});

	const [showMatchHistoryData, setShowMatchHistoryData] = useState(false);
	const transitionMatchHistory = useTransition(showMatchHistoryData, {
		from: {
			opacity: 0,
			x: -100,
		},
		enter: {
			opacity: 1,
			x: 0,
		},
		leave: {
			opacity: 0,
			x: 100,
		},
	});

	const { addMatchData } = useActions();
	useEffect(() => {
		if (!isMatchHistoryLoading && matchHistoryData![0].players) {
			matchHistoryData!.map(match => 	addMatchData({...match, username}));
		}
	}, [matchHistoryData]);

	return (
		<>
			{isError && <p className='warning-text'>Something went wrong...</p>}
			{!isLoading ? (
				<div className='account-details'>
					<div className='user-details'>
						<div className='name-region'>
							<h1>
								{data?.name}#{data?.tag}
							</h1>
							<h1>{data?.region}</h1>
						</div>
						<span className='account-level'>{data?.account_level}</span>
					</div>
					<img src={data?.card.wide} alt='valo card' className='card' />
				</div>
			) : (
				<span className='loader details'></span>
			)}

			<nav className='nav'>
				<button className='nav-btn' onClick={() => handleMmrDataClick()}>
					<span>MMR Data</span>
				</button>
				<button
					className='nav-btn'
					onClick={() => handleMatchHistoryDataClick()}>
					<span>Ranked matches history</span>
				</button>
			</nav>
			<div className='relative' style={{ position: 'relative' }}>
				{isMmrError && <p className='warning-text'>Something went wrong...</p>}
				{isMmrLoading && <span className='loader details'></span>}
				{transitionMmr(
					(style, item) =>
						!isMmrLoading &&
						!isMmrError &&
						item && (
							<animated.div style={style}>
								<AccountMMR {...mmrData} />
							</animated.div>
						)
				)}

				{isMatchHistoryError && (
					<p className='warning-text'>Something went wrong...</p>
				)}
				{isMatchHistoryLoading && <span className='loader details'></span>}
				{transitionMatchHistory(
					(style, item) =>
						!isMatchHistoryLoading &&
						!isMatchHistoryError &&
						matchHistoryData![0].metadata &&
						item && (
							<animated.div style={style}>
								<AccountMatchHistory />
							</animated.div>
						)
				)}
			</div>
		</>
	);
};

export default AccountDetails;
