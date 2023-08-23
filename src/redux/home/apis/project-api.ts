import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
	reducerPath: 'projectApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BACKEND_URL,
		async prepareHeaders(headers, api) {
			const token = localStorage.getItem('token');
			if (token) headers.set('authorization', `Bearer ` + token);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getProject: builder.query({
			query: (idProject: string) => ({
				url: `/projects/${idProject}`,
			}),
		}),
	}),
});

export const { useGetProjectQuery } = projectApi;
