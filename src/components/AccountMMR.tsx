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
	wins,
	number_of_games,
}: IMmrData) => {
	const isLastGameLost = mmr_change_to_last_game! < 0 ? 'lost' : 'won';
	const matchData = useAppSelector(state => state.matches);

	const [playerStats, setPlayerStats] = useState<AllPlayer[]>([]);

	useEffect(() => {
		if (matchData.length > 0) {
			for (let match of matchData) {
				match.player && setPlayerStats(prev => [...prev, match.player]);
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
				<p className='account-mmr-card-data rank'>
					Rank: {currenttierpatched}
					<img
						className='player-rank'
						src={`https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${currenttier}/smallicon.png`}
						alt='Rank'
					/>
				</p>
				<p className='account-mmr-card-data'>
					Matches in e5a2: {number_of_games || 0}
				</p>
				<p className='account-mmr-card-data'>Wins: {wins || 0} Win%: {number_of_games ? ((wins! / number_of_games!) * 100).toFixed(1) : 0}%</p>
				<p className='account-mmr-card-data'>RR points: {ranking_in_tier}</p>
				<p className='account-mmr-card-data'>Elo: {elo} Tier: {currenttier}</p>
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

export default AccountMMR;
