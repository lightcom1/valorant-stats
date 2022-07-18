import React from 'react';
import { HistoryData } from '../models/matchHistory';
import { useAppSelector } from './../hooks/redux';

const Card: React.FC<HistoryData> = ({
	metadata,
	players,
	teams,
}: HistoryData) => {
	const { username } = useAppSelector(state => state.account);

	function convertMsToMinutesSeconds(milliseconds: number) {
		const minutes = Math.floor(milliseconds! / 60000);
		const seconds = Math.floor((milliseconds! % 60000) / 1000);

		return seconds === 60
			? `${minutes + 1}:00`
			: `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	const playerIndex = players?.all_players.findIndex(
		player => player.name === username
	);
	const playerTeam = players?.all_players[playerIndex!].team;
	const isRedWon = teams?.red.has_won;
	const isDraw = !teams?.red.has_won && !teams?.blue.has_won;
	const isWon = playerTeam === 'Blue' ? !isRedWon : isRedWon;

	const redWon = teams?.red.rounds_won;
	const blueWon = teams?.blue.rounds_won;

	const time = new Date(`${metadata?.game_start_patched}`);
	let hours = time.getHours() + 1;
	const AmOrPm = hours >= 12 ? 'PM' : 'AM';
	const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];

	const player = players?.all_players[playerIndex!];

	return (
		<div className='match'>
			<div className='match-data'>
				<div className='match-data-score'>
					<span className={`rounds__won ${isWon && 'victory'}`}>
						{playerTeam === 'Blue' ? blueWon : redWon}
					</span>
					<span className={`rounds__lost ${!isWon && 'defeat'}`}>
						{playerTeam === 'Blue' ? redWon : blueWon}
					</span>
				</div>
				<div className='match-data-info'>
					<p className='day'>
						{month[time.getMonth()]} {daysInWeek[time.getDay()]}{' '}
						{hours % 12 || 12}:{time.getMinutes()} {AmOrPm}
					</p>
					<p className='minutes'>
						Time: {convertMsToMinutesSeconds(metadata?.game_length!)} min
					</p>
					<div className='map-stats'>
						<p className='map-stats__map'>{metadata?.map}:</p>
						{!isDraw && (
							<p
								className={`map-stats__result ${isWon ? 'victory' : 'defeat'}`}>
								{isWon ? 'Victory' : 'Defeat'}
							</p>
						)}
						{isDraw && <p className='map-stats__result draw'>Draw</p>}
					</div>
					<p className='score'>Score: {player!.stats.score}</p>
				</div>
			</div>
			<div className='player-stats'>
				<img src={player!.assets.agent.small} alt='agent' />
				<div className='player-stats-stat'>
					<p className='kills'>Kills: {player!.stats.kills}</p>
					<p className='assists'>Assists: {player!.stats.assists}</p>
					<p className='deaths'>Deaths: {player!.stats.deaths}</p>
					<p className='head'>Headshots: {player!.stats.headshots}</p>
					<p className='head'>
						K/D: {(player!.stats.kills / player!.stats.deaths).toFixed(1)}
					</p>
					<p className='head'>
						HS%:{' '}
						{((player!.stats.headshots / player!.stats.kills) * 100).toFixed(2)}
						%
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
