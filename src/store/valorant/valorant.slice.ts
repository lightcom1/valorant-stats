import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_ACC_NAME = 'name';
const LS_ACC_TAG = 'tag';

interface AccountState {
	username: string;
	tag: string;
}

const initialState: AccountState = {
	username: JSON.parse(localStorage.getItem(LS_ACC_NAME) ?? ''),
	tag: JSON.parse(localStorage.getItem(LS_ACC_TAG) ?? ''),
};

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		addData(state, action: PayloadAction<string>) {
			let [un, tag] = action.payload.split('#');

			state.username = un;
			state.tag = tag;
			localStorage.setItem(LS_ACC_NAME, JSON.stringify(state.username));
			localStorage.setItem(LS_ACC_TAG, JSON.stringify(state.tag));
		},
	},
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
