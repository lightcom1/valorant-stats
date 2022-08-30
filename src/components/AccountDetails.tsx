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
import { v4 as uuidv4 } from 'uuid';

const AccountDetails: React.FC = () => {
	const { username, tag, region } = useAppSelector(state => state.account);
	const { isLoading, isError, data } = useGetAccDataQuery(`${username}#${tag}`);
	const [isFavorite, setisFavorite] = useState(false);
	const [favorites, setFavorites] = useState<any[]>([]);

	let navigate = useNavigate();

	const {
		isLoading: isMmrLoading,
		isError: isMmrError,
		data: mmrData,
	} = useGetMmrDataQuery(`${region}#${username}#${tag}`);

	const {
		isLoading: isAccGamesLoading,
		isError: isAccGamesError,
		data: accGamesData,
	} = useGetAccGamesDataQuery(`${region}#${username}#${tag}`);

	const {
		isLoading: isMatchHistoryLoading,
		isError: isMatchHistoryError,
		data: matchHistoryData,
	} = useGetMatchHistoryDataQuery(`${region}#${username}#${tag}`);

	const {
		isLoading: isUnratedMatchHistoryLoading,
		isError: isUnratedMatchHistoryError,
		data: unratedMatchHistoryData,
	} = useGetUnrankedMatchHistoryDataQuery(`${region}#${username}#${tag}`);

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

	useEffect(() => {
		const favoritesLC = JSON.parse(localStorage.getItem('favorites')!) || [];
		setFavorites(favoritesLC);
		for (let player of favoritesLC) {
			if (`${username}#${tag}`.toLowerCase() === player.name.toLowerCase()) {
				setisFavorite(true);
			}
		}
	}, [tag, username]);

	const addToFavorite = () => {
		setisFavorite(!isFavorite);

		if (!isFavorite) {
			const newFavorite = {
				name: `${username}#${tag}`,
				id: uuidv4(),
			};
			localStorage.setItem(
				'favorites',
				JSON.stringify([...favorites, newFavorite])
			);
			setFavorites([...favorites, newFavorite]);
		} else {
			const filteredFavorites = favorites.filter(
				player => player.name !== `${username}#${tag}`
			);

			localStorage.setItem('favorites', JSON.stringify([...filteredFavorites]));
			setFavorites([...filteredFavorites]);
		}
	};

	return (
		<>
			<ParticlesBg />
			{isError && (
				<p className='warning-text'>
					Error while loading player info... Reload data or try again later
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
						<div className='level-favorite'>
							<span className='account-level'>{data?.account_level}</span>
							<div
								className='favorites-btn'
								onClick={() => addToFavorite()}>
								<svg
									width='35'
									height='35'
									viewBox='0 0 39 39'
									fill='none'
									className={`favorites-icon${isFavorite ? ' filled' : ''}`}
									xmlns='http://www.w3.org/2000/svg'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M17.0403 6.68555C18.1363 4.79687 20.8637 4.79688 21.9597 6.68556L25.3159 12.4695C25.6252 13.0027 26.1599 13.3665 26.7694 13.4585L32.3426 14.3003C34.7719 14.6672 35.6241 17.7345 33.7321 19.302L29.6714 22.6662C29.1015 23.1384 28.8335 23.8833 28.9719 24.6104L30.1094 30.5838C30.555 32.9238 28.0986 34.7418 25.9909 33.632L20.4464 30.7126C19.854 30.4007 19.146 30.4007 18.5536 30.7126L13.0091 33.632C10.9014 34.7418 8.44504 32.9238 8.89061 30.5838L10.0281 24.6104C10.1665 23.8833 9.89854 23.1384 9.32859 22.6662L5.26787 19.302C3.37591 17.7345 4.22806 14.6672 6.65743 14.3003L12.2306 13.4585C12.8401 13.3665 13.3748 13.0027 13.6841 12.4695L17.0403 6.68555Z'
										stroke='white'
										strokeWidth='3'
										strokeLinejoin='round'
									/>
								</svg>
							</div>
						</div>
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
						Error while loading mmr data... Reload data or try again later
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
						Error while loading match history... Reload data or try again later
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
						Error while loading unrated match history... Reload data or try again later
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
