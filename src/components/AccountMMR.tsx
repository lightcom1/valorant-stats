import './account-mmr.scss';
import React, { useEffect, useState } from 'react';
import { IMmrData } from '../models/models';
import { useAppSelector } from '../hooks/redux';
import { AllPlayer } from './../models/matchHistory';

const AccountMMR: React.FC<IMmrData> = ({
	currenttier,
	elo,
	mmr_change_to_last_game,
	currenttierpatched,
	ranking_in_tier,
}: IMmrData) => {
	const isLastGameLost = mmr_change_to_last_game! < 0 ? 'lost' : 'won';
	const matchData = useAppSelector(state => state.matches);

	const [playerStats, setPlayerStats] = useState<AllPlayer[]>([]);

	useEffect(() => {
		if (matchData.length > 0) {
			for (let match of matchData) {
				setPlayerStats(prev => [...prev, match.player]);
			}
		}
	}, [matchData]);

	console.log('playerStats: ', playerStats);

	//HSRate calculations
	const bodyShots = playerStats
		.map(match => match.stats.bodyshots)
		.reduce((a, b) => a + b, 0);
	const legShots = playerStats
		.map(match => match.stats.legshots)
		.reduce((a, b) => a + b, 0);
	const headShots = playerStats
		.map(match => match.stats.headshots)
		.reduce((a, b) => a + b, 0);

	const hsRate = (
		(headShots / (headShots + bodyShots + legShots)) *
		100
	).toFixed(1);

	//KD & KDA calculations
	const kills = playerStats
		.map(match => match.stats.kills)
		.reduce((a, b) => a + b, 0);
	const deaths = playerStats
		.map(match => match.stats.deaths)
		.reduce((a, b) => a + b, 0);
	const assists = playerStats
		.map(match => match.stats.assists)
		.reduce((a, b) => a + b, 0);

	const KD = (kills / deaths).toFixed(2);
	const KDA = ((kills + assists) / deaths).toFixed(2);

	//Favorite agent calculations
	const agents: any = playerStats
		.map(match => match.character)
		.reduce((acc: any, el: string) => {
			acc[el] = (acc[el] || 0) + 1;
			return acc;
		}, {});
	const pickRate: number[] = Object.values(agents);
	const favAgent = Object.keys(agents).find(
		key => agents[key] === Math.max(...pickRate)
	);

	let favAgentImage = '';
	playerStats.forEach(match => {
		if (match.character === favAgent) {
			favAgentImage = match.assets.agent.full;
			return;
		}
	});

	return (
		<div className='account-mmr'>
			<div className='account-mmr-card'>
				<p className='account-mmr-card-data'>
					Current rank: {currenttierpatched}
				</p>
				<p className='account-mmr-card-data'>RR points: {ranking_in_tier}</p>
				<p className='account-mmr-card-data'>Elo: {elo}</p>
				<p className='account-mmr-card-data'>Tier: {currenttier}</p>
				<p className='account-mmr-card-data'>
					Last match result:{' '}
					<span className={isLastGameLost}>{mmr_change_to_last_game}</span>
				</p>
				<p className='account-mmr-card-data'>Last 5 Matches: </p>
				<p className='account-mmr-card-data match'>Headshot%: {hsRate}%</p>
				<p className='account-mmr-card-data match'>
					Kills: {kills} Deaths: {deaths}
				</p>
				<p className='account-mmr-card-data match'>Assists: {assists}</p>
				<p className='account-mmr-card-data match'>
					KD: <span className={`${+KD < 1 ? 'less' : ''}`}>{KD}</span> KDA:
					<span className={`${+KDA < 1 ? 'less' : ''}`}> {KDA}</span>
				</p>
				<p className='account-mmr-card-data match'>
					Favorite agent: {favAgent}
				</p>
			</div>

			<div className='fav-agent'>
				<img
					src={favAgentImage}
					alt='favorite agent'
				/>
			</div>
		</div>
	);
};

export default AccountMMR;
