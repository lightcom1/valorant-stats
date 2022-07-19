import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankedHistoryResponse } from '../../models/matchHistory';
import { AccountData, IMmrData, ServerResponse, MmrResponse } from './../../models/models';
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
		getMmrData: build.query<IMmrData, string>({
			query: (search: string) => ({
				url: `v1/mmr/eu/${search.split('#').join('/')}`,
			}),
			transformResponse: (response: MmrResponse<IMmrData>) =>
				response.data,
		}),
		getMatchHistoryData: build.query<HistoryData[], string>({
			query: (search: string) => ({
				url: `v3/matches/eu/${search.split('#').join('/')}?filter=competitive`,
			}),
			transformResponse: (response: RankedHistoryResponse<HistoryData>) =>
				response.data,
		}),
	}),
});

export const { useLazyGetAccDataQuery, useGetAccDataQuery, useGetMmrDataQuery, useGetMatchHistoryDataQuery } = valorantApi;
