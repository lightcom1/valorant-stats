import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	Metadata,
	Teams,
	AllPlayer,
} from '../../models/matchHistory';

interface MatchState {
	metadata: Metadata;
	player: AllPlayer;
	teams: Teams;
}

const initialState: any = [
	{
		metadata: {
			map: '',
			game_version: '',
			game_length: 0,
			game_start: 0,
			game_start_patched: '',
			rounds_played: 0,
			mode: '',
			queue: '',
			season_id: '',
			platform: '',
			matchid: '',
			region: '',
			cluster: '',
		},

		all_players: [],

		teams: {
			red: {
				has_won: false,
				rounds_won: 0,
				rounds_lost: 0,
			},
			blue: {
				has_won: false,
				rounds_won: 0,
				rounds_lost: 0,
			},
		},
	},
];



export const matchSlice = createSlice({
	name: 'match',
	initialState,
	reducers: {
		addMatchData(state, action: PayloadAction<any>) {
		
			const plIndex = action.payload.players.all_players.findIndex((player: any) => player.name.toLowerCase() === action.payload.username.toLowerCase())
			
			const data = {
				metadata: action.payload.metadata,
				player: action.payload.players.all_players[plIndex],
				teams: action.payload.teams,
			};
			state.push(data);
			if (state[0].metadata.map === '') state.shift();
		},
	},
});

export const matchActions = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
