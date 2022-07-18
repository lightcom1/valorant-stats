import './account-mmr.scss';
import React from 'react';
import { IMmrData } from '../models/models';

const AccountMMR: React.FC<IMmrData> = ({
	currenttier,
	elo,
	mmr_change_to_last_game,
	currenttierpatched,
	ranking_in_tier,
}: IMmrData) => {

	const isLastGameLost = mmr_change_to_last_game! < 0 ? 'lost' : 'won';


	return (
		<div className='account-mmr'>
			<div className='account-mmr-card'>
				<p className='account-mmr-card-data'>Current rank: {currenttierpatched}</p>
				<p className='account-mmr-card-data'>RR points: {ranking_in_tier}</p>
				<p className='account-mmr-card-data'>Elo: {elo}</p>
				<p className='account-mmr-card-data'>Tier: {currenttier}</p>
				<p className='account-mmr-card-data'>Earned in last match: <span className={isLastGameLost}>{mmr_change_to_last_game}</span></p>
			</div>
		</div>
	);
};

export default AccountMMR;
