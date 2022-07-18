import './account-matches.scss';
import React from 'react';
import Card from './Card';
import { HistoryData } from './../models/matchHistory';

const AccountMatchHistory: React.FC<any> = ({ matchData }: any) => {
	console.log('matchData: ', matchData);

	return (
		<div className='account-matches'>
			{matchData.map((match: HistoryData, i: number) => (
				<Card {...match} key={i}/>
			))}
		</div>
	);
};

export default AccountMatchHistory;
