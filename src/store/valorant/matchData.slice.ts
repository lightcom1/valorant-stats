import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any[] = [];

export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		addMatchData(state, action: PayloadAction<any>) {
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
	},
});

export const matchActions = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
