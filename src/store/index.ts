import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { valorantApi } from './valorant/valorant.api';
import { accountReducer } from './valorant/valorant.slice';

export const store = configureStore({
	reducer: {
		[valorantApi.reducerPath]: valorantApi.reducer,
		account: accountReducer,
	},

});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>