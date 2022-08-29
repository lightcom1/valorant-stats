import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_ACC_NAME = 'name';
const LS_ACC_TAG = 'tag';
const LS_ACC_REGION = 'region';

interface AccountState {
	username: string;
	tag: string;
	region: string;
}

const initialState: AccountState = {
	username: JSON.parse(localStorage.getItem(LS_ACC_NAME)!) ?? '',
	tag: JSON.parse(localStorage.getItem(LS_ACC_TAG)!) ?? '',
	region: JSON.parse(localStorage.getItem(LS_ACC_REGION)!) ?? '',
};

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		addData(state, action: PayloadAction<string>) {
			let [un, tag, region] = action.payload.split('#');

			state.username = un;
			state.tag = tag;
			state.region = region;

			localStorage.setItem(LS_ACC_NAME, JSON.stringify(state.username));
			localStorage.setItem(LS_ACC_TAG, JSON.stringify(state.tag));
			localStorage.setItem(LS_ACC_REGION, JSON.stringify(state.region));
		},
	},
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
