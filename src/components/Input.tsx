import React, { useState, useEffect } from 'react';
import { useLazyGetAccDataQuery } from '../store/valorant/valorant.api';
import { useNavigate } from 'react-router-dom';
import './input.scss';
import './loader.scss';
import { useActions } from './../hooks/actions';
import videoV from '../assets/VALORANT_ANNO22_SHATTERED_16x9_27s.mp4'

const Input = () => {
	const [nickname, setNickname] = useState('');

	let navigate = useNavigate();
	const [fetchAccount, { isLoading, isError, data }] = useLazyGetAccDataQuery();

	const { addData } = useActions();

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
		data?.name && addData(nickname);
		data?.name && navigate('../account-details');
	}, [data]);

	useEffect(() => {
		const username = JSON.parse(localStorage.getItem('name')!) ?? '';
		const tag = JSON.parse(localStorage.getItem('tag')!) ?? '';

		setNickname(`${username}#${tag}`);
	}, []);


	return (
		<div className='input-wrapper'>
			<video
				autoPlay
				preload='true'
				muted
				loop
				className='main-video'
				>
				<source
					src={videoV}
					type='video/mp4'
				/>
			</video>
			{isError && (
				<p className='warning-text'>
					Invalid nickname and/or tag "username#tag" <br/>
					Also if you have AdBlock you need to disable it
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
				<button className='search-btn' onClick={searchHandler}>
					<span className='search-text'>Search</span>
				</button>
			</div>
		</div>
	);
};

export default Input;
