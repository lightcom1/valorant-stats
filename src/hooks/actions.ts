import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { matchActions } from '../store/valorant/matchData.slice';
import { accountActions } from '../store/valorant/valorant.slice';


const actions = { 
	...accountActions,
	...matchActions
}

export const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(actions, dispatch);
};
