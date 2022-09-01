import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HistoryResponse } from '../../models/matchHistory';
import {
	AccountData,
	IMmrData,
	ServerResponse,
	MmrResponse,
	AccGamesData,
	AccGamesDataResponse,
	RRPoints,
	RRPointsResponse
} from './../../models/models';
import { HistoryData } from './../../models/matchHistory';

export const valorantApi = createApi({
	reducerPath: 'valorant/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.henrikdev.xyz/valorant/',
	}),
	endpoints: build => ({
		getAccData: build.query<AccountData, string>({
			query: (search: string) => ({
				url: `v1/account/${search.split('#').join('/')}`,
			}),
			transformResponse: (response: ServerResponse<AccountData>) =>
				response.data,
		}),
		getRRPointsData: build.query<RRPoints, string>({
			query: (search: string) => ({
				url: `v1/mmr-history/${search.split('#').join('/')}`,
			}),
			transformResponse: (response: RRPointsResponse<RRPoints>) =>
				response.data,
		}),
		getAccGamesData: build.query<AccGamesData, string>({
			query: (search: string) => ({
				url: `v2/mmr/${search.split('#').join('/')}?filter=e5a2`,
			}),
			transformResponse: (response: AccGamesDataResponse<AccGamesData>) => ({
				number_of_games: response.data.number_of_games,
				wins: response.data.wins,
			}),
		}),
		getMmrData: build.query<IMmrData, string>({
			query: (search: string) => ({
				url: `v1/mmr/${search.split('#').join('/')}`,
			}),
			transformResponse: (response: MmrResponse<IMmrData>) => response.data,
		}),
		getMatchHistoryData: build.query<HistoryData[], string>({
			query: (search: string) => ({
				url: `v3/matches/${search.split('#').join('/')}?filter=competitive`,
			}),
			transformResponse: (response: HistoryResponse<HistoryData>) =>
				response.data,
		}),
		getUnrankedMatchHistoryData: build.query<HistoryData[], string>({
			query: (search: string) => ({
				url: `v3/matches/${search.split('#').join('/')}?filter=unrated`,
			}),
			transformResponse: (response: HistoryResponse<HistoryData>) =>
				response.data,
		}),
	}),
});

export const {
	useLazyGetAccDataQuery,
	useGetAccDataQuery,
	useGetMmrDataQuery,
	useGetMatchHistoryDataQuery,
	useGetUnrankedMatchHistoryDataQuery,
	useGetAccGamesDataQuery,
	useGetRRPointsDataQuery
} = valorantApi;
