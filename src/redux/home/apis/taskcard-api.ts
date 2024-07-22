import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskcardApi = createApi({
	reducerPath: 'taskcardApi',
	tagTypes: ['TaskCards'],
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
		addTaskCard: builder.mutation({
			query: (data) => {
				const { card } = data;
				return {
					url: `/taskCard`,
					method: 'POST',
					body: card,
				};
			},

			invalidatesTags: ['TaskCards'],
		}),
	}),
});

export const {} = taskcardApi;
