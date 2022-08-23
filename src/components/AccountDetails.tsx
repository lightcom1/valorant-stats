import { useAppSelector } from '../hooks/redux';
import {
	useGetAccDataQuery,
	useGetAccGamesDataQuery,
	useGetMatchHistoryDataQuery,
	useGetMmrDataQuery,
	useGetUnrankedMatchHistoryDataQuery,
} from '../store/valorant/valorant.api';
import './accountDetails.scss';
import './loader.scss';
import AccountMMR from './AccountMMR';
import AccountMatchHistory from './AccountMatchHistory';
import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { useActions } from '../hooks/actions';
import { useNavigate } from 'react-router-dom';
import AccountUnratedMatchHistory from './AccountUnratedMatchHistory';
import AccountUnratedMMR from './AccountUnratedMMR';
import ParticlesBg from './ParticlesBg';

const AccountDetails: React.FC = () => {
	const { username, tag } = useAppSelector(state => state.account);
	const { isLoading, isError, data } = useGetAccDataQuery(`${username}#${tag}`);

	let navigate = useNavigate();

	const {
		isLoading: isMmrLoading,
		isError: isMmrError,
		data: mmrData,
	} = useGetMmrDataQuery(`${username}#${tag}`);

	const {
		isLoading: isAccGamesLoading,
		isError: isAccGamesError,
		data: accGamesData,
	} = useGetAccGamesDataQuery(`${username}#${tag}`);

	const {
		isLoading: isMatchHistoryLoading,
		isError: isMatchHistoryError,
		data: matchHistoryData,
	} = useGetMatchHistoryDataQuery(`${username}#${tag}`);

	const {
		isLoading: isUnratedMatchHistoryLoading,
		isError: isUnratedMatchHistoryError,
		data: unratedMatchHistoryData,
	} = useGetUnrankedMatchHistoryDataQuery(`${username}#${tag}`);

	const handleMmrDataClick = () => {
		setShowMatchHistoryData(false);
		setShowUnratedMatchHistoryData(false);
		setShowMmrData(!showMmrData);
	};
	const handleMatchHistoryDataClick = () => {
		setShowMmrData(false);
		setShowUnratedMatchHistoryData(false);
		setShowMatchHistoryData(!showMatchHistoryData);
	};
	const handleUnratedMatchHistoryDataClick = () => {
		setShowMmrData(false);
		setShowMatchHistoryData(false);
		setShowUnratedMatchHistoryData(!showUnratedMatchHistoryData);
	};

	const transitionOptions = {
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
	};

	const [showMmrData, setShowMmrData] = useState(false);
	const transitionMmr = useTransition(showMmrData, transitionOptions);

	const [showMatchHistoryData, setShowMatchHistoryData] = useState(false);
	const transitionMatchHistory = useTransition(
		showMatchHistoryData,
		transitionOptions
	);

	const [showUnratedMatchHistoryData, setShowUnratedMatchHistoryData] =
		useState(false);
	const transitionUnratedMatchHistory = useTransition(
		showUnratedMatchHistoryData,
		transitionOptions
	);

	const { addMatchData, addUnratedMatchData } = useActions();

	useEffect(() => {
		if (
			matchHistoryData!?.length &&
			!isMatchHistoryLoading &&
			matchHistoryData![0]?.players
		) {
			matchHistoryData!.map(match => addMatchData({ ...match, username }));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchHistoryData]);

	useEffect(() => {
		if (
			unratedMatchHistoryData!?.length &&
			!isUnratedMatchHistoryLoading &&
			unratedMatchHistoryData![0]?.players
		) {
			unratedMatchHistoryData!.map(match =>
				addUnratedMatchData({ ...match, username })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [unratedMatchHistoryData]);

	return (
		<>
		<ParticlesBg/>
			{isError && (
				<p className='warning-text'>
					Error while loading player info... Try again later
				</p>
			)}
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
				{!isMmrLoading && (
					<button className='nav-btn' onClick={() => handleMmrDataClick()}>
						<span>
							{mmrData!?.currenttierpatched ? 'MMR Data' : 'Unrated MMR Data'}
						</span>
					</button>
				)}
				{!isMatchHistoryLoading && matchHistoryData!?.length > 0 && (
					<button
						className='nav-btn'
						onClick={() => handleMatchHistoryDataClick()}>
						<span>Ranked matches</span>
					</button>
				)}
				{!isUnratedMatchHistoryLoading && unratedMatchHistoryData!?.length > 0 && (
					<button
						className='nav-btn'
						onClick={() => handleUnratedMatchHistoryDataClick()}>
						<span>Unrated matches</span>
					</button>
				)}
			</nav>

			<div className='relative' style={{ position: 'relative' }}>
				{isMmrError && (
					<p className='warning-text'>
						Error while loading mmr data... Try again later
					</p>
				)}
				{isMmrLoading && <span className='loader details'></span>}
				{transitionMmr(
					(style, item) =>
						!isMmrLoading &&
						!isMmrError &&
						!isAccGamesLoading &&
						!isAccGamesError &&
						item && (
							<animated.div style={style}>
								{mmrData!?.currenttierpatched ? (
									<AccountMMR {...mmrData} {...accGamesData} />
								) : (
									<AccountUnratedMMR />
								)}
							</animated.div>
						)
				)}

				{isMatchHistoryError && (
					<p className='warning-text'>
						Error while loading match history... Try again later
					</p>
				)}
				{isMatchHistoryLoading && <span className='loader details'></span>}
				{transitionMatchHistory(
					(style, item) =>
						!isMatchHistoryLoading &&
						!isMatchHistoryError &&
						matchHistoryData!?.length > 0 &&
						matchHistoryData![0].metadata &&
						item && (
							<animated.div style={style}>
								<AccountMatchHistory />
							</animated.div>
						)
				)}

				{isUnratedMatchHistoryError && (
					<p className='warning-text'>
						Error while loading unrated match history... Try again later
					</p>
				)}

				{isUnratedMatchHistoryLoading && (
					<span className='loader details'></span>
				)}
				{transitionUnratedMatchHistory(
					(style, item) =>
						!isUnratedMatchHistoryLoading &&
						!isUnratedMatchHistoryError &&
						unratedMatchHistoryData!?.length > 0 &&
						unratedMatchHistoryData![0].metadata &&
						item && (
							<animated.div style={style}>
								<AccountUnratedMatchHistory />
							</animated.div>
						)
				)}
			</div>

			<div className='back-home'>
				<button className='nav-btn back' onClick={() => navigate('/')}>
					<span>Back to search</span>
				</button>
				<button
					className='nav-btn reload'
					onClick={() => window.location.reload()}>
					<span>Reload Data</span>
				</button>
			</div>
		</>
	);
};

export default AccountDetails;
