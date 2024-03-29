import './account-matches.scss';
import React from 'react';
import Card from './Card';
import { AllPlayer, Metadata, Teams } from './../models/matchHistory';
import { useAppSelector } from '../hooks/redux';

interface MatchState {
	metadata: Metadata;
	player: AllPlayer;
	teams: Teams;
	rrPointsChange: number;
}

const AccountMatchHistory: React.FC<any> = () => {
	const matchData = useAppSelector(state => state.matches);

	return (
		<div className='account-matches'>
			{matchData.map((match: MatchState, i: number) => (
				match.player && <Card
					metadata={match.metadata}
					player={match.player}
					teams={match.teams}
					rrPointsChange={match.rrPointsChange}
					key={i}
				/>
			))}
		</div>
	);
};

export default AccountMatchHistory;
