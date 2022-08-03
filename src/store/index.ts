import { configureStore } from '@reduxjs/toolkit';
import { matchReducer } from './valorant/matchData.slice';
import { valorantApi } from './valorant/valorant.api';
import { accountReducer } from './valorant/valorant.slice';
import { unratedMatchReducer } from './valorant/unratedMatchData.slice';

export const store = configureStore({
	reducer: {
		[valorantApi.reducerPath]: valorantApi.reducer,
		account: accountReducer,
		matches: matchReducer,
		unratedMatches: unratedMatchReducer
	},

});

export type RootState = ReturnType<typeof store.getState>