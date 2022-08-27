import React, { useState, useEffect } from 'react';
import { useLazyGetAccDataQuery } from '../store/valorant/valorant.api';
import { useNavigate } from 'react-router-dom';
import './input.scss';
import './loader.scss';
import { useActions } from './../hooks/actions';
import videoV from '../assets/VALORANT_ANNO22_SHATTERED_16x9_27s.mp4';
import { useTransition, animated } from 'react-spring';
import Favorites from './Favorites';

const Input = () => {
	const [nickname, setNickname] = useState<string>('');
	const [showFavorites, setShowFavorites] = useState<boolean>(false);
	const { addData, reset, resetUnrated } = useActions();

	const [fetchAccount, { isLoading, isError, data }] = useLazyGetAccDataQuery();

	let navigate = useNavigate();

	const findPlayer = () => {
		if (nickname.length === 0) return false;

		fetchAccount(nickname);
	};

	const searchHandler = () => {
		findPlayer();
	};

	const handlerEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			findPlayer();
		}
	};

	useEffect(() => {
		resetUnrated();
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		data?.name && addData(nickname);
		data?.name && navigate('/account-details');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		const username = JSON.parse(localStorage.getItem('name')!) ?? '';
		const tag = JSON.parse(localStorage.getItem('tag')!) ?? '';

		username && tag && setNickname(`${username}#${tag}`);
	}, []);

	const transitionOptions = {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
	};
	const transitionFavorites = useTransition(showFavorites, transitionOptions);

	return (
		<div className='input-wrapper'>
			<video
				autoPlay
				preload='true'
				muted
				loop
				playsInline
				className='main-video'>
				<source src={videoV} type='video/mp4' />
			</video>
			{isError && (
				<p className='warning-text'>
					Invalid nickname and/or tag "username#tag" <br />
					Also if you have AdBlock you need to disable it and reload the page
				</p>
			)}
			<input
				className='input-username'
				type='text'
				placeholder='Enter your nickname and tag'
				value={nickname}
				onChange={e => setNickname(e.target.value)}
				onKeyPress={e => handlerEnter(e)}
			/>
			<div style={{ position: 'relative' }}>
				{isLoading && <span className='loader'></span>}
				{!isLoading && (
					<div
						className='favorites-btn'
						onClick={() => setShowFavorites(!showFavorites)}>
						<svg
							width='39'
							height='39'
							viewBox='0 0 39 39'
							fill='none'
							className='favorites-icon'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M17.0403 6.68555C18.1363 4.79687 20.8637 4.79688 21.9597 6.68556L25.3159 12.4695C25.6252 13.0027 26.1599 13.3665 26.7694 13.4585L32.3426 14.3003C34.7719 14.6672 35.6241 17.7345 33.7321 19.302L29.6714 22.6662C29.1015 23.1384 28.8335 23.8833 28.9719 24.6104L30.1094 30.5838C30.555 32.9238 28.0986 34.7418 25.9909 33.632L20.4464 30.7126C19.854 30.4007 19.146 30.4007 18.5536 30.7126L13.0091 33.632C10.9014 34.7418 8.44504 32.9238 8.89061 30.5838L10.0281 24.6104C10.1665 23.8833 9.89854 23.1384 9.32859 22.6662L5.26787 19.302C3.37591 17.7345 4.22806 14.6672 6.65743 14.3003L12.2306 13.4585C12.8401 13.3665 13.3748 13.0027 13.6841 12.4695L17.0403 6.68555ZM19.8514 7.9089C19.6948 7.63909 19.3052 7.63909 19.1486 7.9089L15.7924 13.6929C15.1118 14.8658 13.9355 15.6662 12.5946 15.8687L7.02146 16.7105C6.6744 16.7629 6.55267 17.2011 6.82295 17.425L10.8837 20.7892C12.1376 21.8281 12.7272 23.4667 12.4226 25.0663L11.2851 31.0398C11.2214 31.3741 11.5723 31.6338 11.8734 31.4752L17.418 28.5558C18.7212 27.8696 20.2788 27.8696 21.582 28.5558L27.1266 31.4752C27.4277 31.6338 27.7786 31.3741 27.7149 31.0398L26.5774 25.0663C26.2728 23.4667 26.8624 21.8281 28.1163 20.7892L32.1771 17.425C32.4473 17.2011 32.3256 16.7629 31.9785 16.7105L26.4054 15.8687C25.0645 15.6662 23.8882 14.8658 23.2076 13.6929L19.8514 7.9089Z'
								fill='#ff1d30'
							/>
						</svg>
					</div>
				)}
				<button className='search-btn' onClick={searchHandler}>
					<span className='search-text'>Search</span>
				</button>
			</div>
 
			{transitionFavorites(
				(style, item) =>
					item && (
						<animated.div style={style}>
							<Favorites showFavorites={showFavorites} setShowFavorites={setShowFavorites} setNickname={setNickname}/>
						</animated.div>
					)
			)}
		</div>
	);
};

export default Input;
