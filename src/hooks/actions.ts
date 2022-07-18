import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { accountActions } from '../store/valorant/valorant.slice';


const actions = { 
	...accountActions,
}

export const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(actions, dispatch);
};
