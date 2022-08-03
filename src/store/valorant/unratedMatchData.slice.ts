import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any[] = [];

export const unratedMatchSlice = createSlice({
	name: 'unratedMatch',
	initialState,
	reducers: {
		addUnratedMatchData(state, action: PayloadAction<any>) {
			const plIndex = action.payload.players.all_players.findIndex(
				(player: any) =>
					player.name.toLowerCase() === action.payload.username.toLowerCase()
			);

			const data = {
				metadata: action.payload.metadata,
				player: action.payload.players.all_players[plIndex],
				teams: action.payload.teams,
			};

			state.push(data);
		},

		resetUnrated: () => initialState,
	},
});

export const unratedMatchActions = unratedMatchSlice.actions;
export const unratedMatchReducer = unratedMatchSlice.reducer;
