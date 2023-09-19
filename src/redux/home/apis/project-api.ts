import { ProjectTypes } from '@interfaces/';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
	reducerPath: 'projectApi',
	tagTypes: ['Projects', 'Project'],
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BACKEND_URL,
		async prepareHeaders(headers, api) {
			const token = localStorage.getItem('token');
			if (token) headers.set('authorization', `Bearer ` + token);
			return headers;
		},
	}),

	endpoints: (builder) => ({
		getProjects: builder.query<ProjectTypes[], void>({
			query: () => ({ url: `/projects` }),
			providesTags: ['Projects'],
		}),

		obtainProject: builder.query<ProjectTypes, string>({
			query: (idProject) => ({
				url: `/projects/${idProject}`,
			}),
			providesTags: ['Project'],
		}),

		addProject: builder.mutation({
			query: (data) => {
				return {
					url: `/projects`,
					method: 'POST',
					body: {
						name: data.name_board,
						name_img: '',
						public_id: '',
						type: 'public',
					},
				};
			},
			invalidatesTags: ['Projects'],
		}),

		addCollaboratorProject: builder.mutation({
			query: (data) => {
				const { idProject, email } = data;

				return {
					url: `/projects/collaborator/${idProject}`,
					method: 'POST',
					body: {
						email,
					},
				};
			},

			invalidatesTags: ['Project'],
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useObtainProjectQuery,
	useAddProjectMutation,
	useAddCollaboratorProjectMutation,
} = projectApi;
