import { configureStore } from '@reduxjs/toolkit';
import { matchReducer } from './valorant/matchData.slice';
import { valorantApi } from './valorant/valorant.api';
import { accountReducer } from './valorant/valorant.slice';

export const store = configureStore({
	reducer: {
		[valorantApi.reducerPath]: valorantApi.reducer,
		account: accountReducer,
		matches: matchReducer,
	},

});

export type RootState = ReturnType<typeof store.getState>