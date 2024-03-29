export interface IImageCard {
	small: string;
	large: string;
	wide: string;
	id: string;
}

export interface AccountData {
	puuid: string;
	region: string;
	account_level: number;
	name: string;
	tag: string;
	card: IImageCard;
	last_update: string;
}

export interface ServerResponse<T> {
	status: number;
	data: T;
}

export interface IMmrData {
	currenttier?: number | undefined;
	currenttierpatched?: string | undefined;
	ranking_in_tier?: number | undefined;
	mmr_change_to_last_game?: number | undefined;
	elo?: number | undefined;
	name?: string | undefined;
	tag?: string | undefined;
	old?: boolean | undefined;
	wins?: number | undefined;
	number_of_games?: number | undefined;
}

export interface MmrResponse<T> {
	status: number;
	data: T;
}

export interface AccGamesData {
	wins: number;
	number_of_games: number;
}

export interface AccGamesDataResponse<T> {
	status: number;
	data: T;
}

export interface RRPoints {
	currenttier: number;
	currenttierpatched: string;
	ranking_in_tier: number;
	mmr_change_to_last_game: number;
	elo: number;
	date: string;
	date_raw: number;
}

export interface RRPointsResponse<T> {
	status: number;
	name: string;
	tag: string;
	data: T;
}