import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listApi = createApi({
	reducerPath: 'listApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BACKEND_URL,
		async prepareHeaders(headers, api) {
			const token = localStorage.getItem('token');

			if (token) {
				headers.set('authorization', `Bearer ` + token);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getLists: builder.query({
			query: (idProject: string) => ({
				url: `/list/${idProject}`,
			}),
		}),
	}),
});

export const { useGetListsQuery } = listApi;
