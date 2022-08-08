import './account-mmr.scss';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { AllPlayer } from './../models/matchHistory';

const AccountUnratedMMR: React.FC = () => {
	const matchData = useAppSelector(state => state.unratedMatches);
	const [playerStats, setPlayerStats] = useState<AllPlayer[]>([]);

	useEffect(() => {
		if (matchData.length > 0) {
			for (let match of matchData) {
				setPlayerStats(prev => [...prev, match.player]);
			}
		}
	}, [matchData]);

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

	//ACS & ADR calculations
	const rounds = matchData
		.map(match => match.teams.blue.rounds_lost + match.teams.blue.rounds_won)
		.reduce((a, b) => a + b, 0);
	const score = playerStats
		.map(match => match.stats.score)
		.reduce((a, b) => a + b, 0);
	const damage = playerStats
		.map(match => match.damage_made)
		.reduce((a, b) => a + b, 0);

	const ACS = Math.round(score / rounds);
	const ADR = Math.round(damage / rounds);

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
					ACS:{' '}
					<span
						className={`${ACS > 210 ? '' : ACS < 130 ? 'less' : 'average'}`}>
						{ACS}
					</span>{' '}
					ADR:
					<span
						className={`${ADR > 160 ? '' : ADR < 110 ? 'less' : 'average'}`}>
						{' '}
						{ADR}
					</span>
				</p>
				<p className='account-mmr-card-data match'>
					Favorite agent: {favAgent}
				</p>
			</div>

			<div className='fav-agent'>
				<img src={favAgentImage} alt='favorite agent' />
			</div>
		</div>
	);
};

export default AccountUnratedMMR;
