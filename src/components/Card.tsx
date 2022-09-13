import React, { memo } from 'react';
import { AllPlayer, Metadata, Teams } from './../models/matchHistory';

interface MatchState {
	metadata: Metadata;
	player: AllPlayer;
	teams: Teams;
	rrPointsChange: number | undefined;
}

const Card: React.FC<MatchState> = ({
	metadata,
	player,
	teams,
	rrPointsChange,
}: MatchState) => {
	function convertMsToMinutesSeconds(milliseconds: number) {
		const minutes = Math.floor(milliseconds! / 60000);
		const seconds = Math.floor((milliseconds! % 60000) / 1000);

		return seconds === 60
			? `${minutes + 1}:00`
			: `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	//Match result
	const playerTeam = player?.team;
	const isRedWon = teams?.red.has_won;
	const isDraw = !teams?.red.has_won && !teams?.blue.has_won;
	const isWon = playerTeam === 'Blue' ? !isRedWon : isRedWon;

	//Each team won rounds
	const redWon = teams?.red.rounds_won;
	const blueWon = teams?.blue.rounds_won;
	const allRounds = redWon + blueWon;

	//Match date
	const time = new Date(`${metadata?.game_start_patched}`);
	time.setTime(time.getTime() + 1 * 60 * 60 * 1000);
	let hours = time.getHours();
	const AmOrPm = hours >= 12 ? 'PM' : 'AM';
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

	//Player stats
	const KD = (player!?.stats.kills / player!?.stats.deaths).toFixed(1);
	const KDA = (
		(player!?.stats.kills + player!?.stats.assists) /
		player!?.stats.deaths
	).toFixed(1);
	const HsRate = (
		(player!?.stats.headshots /
			(player!?.stats.headshots +
				player!?.stats.bodyshots +
				player!?.stats.legshots)) *
		100
	).toFixed(1);
	const ADR = Math.round(player!?.damage_made / allRounds);
	const ACS = Math.round(player!?.stats.score / allRounds);

	return (
		<div className='match'>
			<div className='match-data'>
				<div className='match-data-score'>
					<span
						className={`rounds__won ${isWon && 'victory'} ${isDraw && 'draw'}`}>
						{playerTeam === 'Blue' ? blueWon : redWon}
					</span>
					<span
						className={`rounds__lost ${!isWon && 'defeat'} ${
							isDraw && 'draw'
						}`}>
						{playerTeam === 'Blue' ? redWon : blueWon}
					</span>
				</div>
				<div className='match-data-info'>
					<p className='day'>
						{month[time.getMonth()]} {time.getDate()}{' '}
						{(AmOrPm === 'PM' && hours === 12 ? 12 : hours % 12) || 0}:
						{time.getMinutes().toString().padStart(2, '0')} {AmOrPm}
					</p>
					<p className='minutes'>
						Time: {convertMsToMinutesSeconds(metadata?.game_length!)} min
					</p>
					<div className='map-stats'>
						<p className='map-stats__map'>{metadata?.map}:</p>
						{!isDraw && (
							<p
								className={`map-stats__result ${isWon ? 'victory' : 'defeat'}`}>
								{isWon
									? `Victory ${rrPointsChange ? '+' + rrPointsChange : ''}`
									: `Defeat ${rrPointsChange || ''}`}
							</p>
						)}
						{isDraw && <p className='map-stats__result draw'>Draw</p>}
					</div>
					<p className='score'>Score: {player!?.stats.score}</p>
				</div>
			</div>

			<div className='player-stats'>
				<img src={player!?.assets.agent.small} alt='agent' />
				<div className='player-stats-stat'>
					<p className='kills'>Kills: {player!?.stats.kills}</p>
					<p className='assists'>Assists: {player!?.stats.assists}</p>
					<p className='deaths'>Deaths: {player!?.stats.deaths}</p>
					<p className='hs'>HS%: {HsRate}%</p>
					<p className='kd'>
						K/D: <span className={`${+KD < 1 ? 'less' : ''}`}>{KD}</span>
					</p>
					<p className='kd'>
						KDA: <span className={`${+KDA < 1 ? 'less' : ''}`}>{KDA}</span>
					</p>
					<p className='acs'>
						ACS:{' '}
						<span className={`${ACS > 220 ? 'more' : ACS < 140 ? 'less' : ''}`}>
							{ACS}
						</span>
					</p>
					<p className='adr'>
						ADR:{' '}
						<span className={`${ADR > 180 ? 'more' : ADR < 120 ? 'less' : ''}`}>
							{ADR}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default memo(Card);
