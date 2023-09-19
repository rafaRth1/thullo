import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListTypes, ProjectTypes, CommentTypes, LabelsTypes, TaskCardTypes, MemberType } from '@interfaces/';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { BaseQueryFn, QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const listApi = createApi({
	reducerPath: 'listApi',
	tagTypes: ['Lists'],
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
		getProject: builder.query<ProjectTypes, string>({
			query: (idProject: string) => ({ url: `/projects/${idProject}` }),
		}),

		getLists: builder.query<ListTypes[], string>({
			query: (idProject: string) => ({ url: `/list/${idProject}` }),
			providesTags: ['Lists'],
		}),

		addList: builder.mutation({
			query: (body) => {
				return {
					url: `/list`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: ['Lists'],
		}),

		editList: builder.mutation({
			query: (data) => {
				const { idList, name } = data;

				return {
					url: `/list/${idList}`,
					method: 'PUT',
					body: {
						name,
					},

					// validateStatus: (response, result) => {
					// 	console.log(response, result)
					// 	return response.status === 200 && !result.isError
					// },
				};
			},
			invalidatesTags: ['Lists'],
		}),

		ordenPositionTaskCards: builder.mutation<
			void,
			{ idList: string; items: TaskCardTypes[]; action: 'REODER_POS' | 'REODER_DRAG' }
		>({
			query: (data) => {
				const { idList, items, action } = data;

				return {
					url: `/list/update-list/${idList}`,
					method: 'PUT',
					body: {
						items,
						action,
					},

					// validateStatus: (response, result) => {
					// 	console.log(response, result)
					// 	return response.status === 200 && !result.isError
					// },
				};
			},

			// async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
			// 	const patchResult = dispatch(
			// 		listApi.util.updateQueryData('getLists', patch.idList, (draft) => {
			// 			draft.map((list) => {
			// 				if (list._id === patch.idList) {
			// 					list.taskCards = patch.items;
			// 					return list;
			// 				}

			// 				return list;
			// 			});

			// 			console.log('Se resuelve');
			// 		})
			// 	);

			// 	queryFulfilled.catch(patchResult.undo());
			// },

			// invalidatesTags: ['Lists'],
		}),

		orderTaskCardsOndrag: builder.mutation<
			void,
			{
				idListSource: string;
				idListDestination: string;
				idCard: string;
				action: 'REODER_POS' | 'REODER_DRAG';
			}
		>({
			query: (data) => {
				const { idListSource, idListDestination, idCard, action } = data;

				return {
					url: `/list/update-list/${idListSource}`,
					method: 'PUT',
					body: {
						idListSource,
						idListDestination,
						idCard,
						action,
					},
				};
			},
		}),

		addTaskCard: builder.mutation({
			query: (data) => {
				const { card } = data;
				console.log(card);
				return {
					url: `/taskCard`,
					method: 'POST',
					body: card,
				};
			},
			invalidatesTags: ['Lists'],
		}),

		editTaskCard: builder.mutation({
			query: (data) => {
				const { idTaskCard, nameCard } = data;
				return {
					url: `/taskCard/${idTaskCard}`,
					method: 'PUT',
					body: {
						nameCard,
					},
				};
			},
			invalidatesTags: ['Lists'],
		}),

		deleteTaskCard: builder.mutation<void, string>({
			query: (idTaskCard) => {
				return {
					url: `/taskCard/${idTaskCard}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: ['Lists'],
		}),

		editDescriptionTaskCard: builder.mutation({
			query: (data) => {
				const { idTaskCard, description } = data;
				return {
					url: `/taskCard/${idTaskCard}`,
					method: 'PUT',
					body: {
						description,
					},
				};
			},
			invalidatesTags: ['Lists'],
		}),

		editImageTaskCard: builder.mutation({
			query: (data) => {
				const { idTaskCard, imgUlr } = data;
				return {
					url: `/taskCard/${idTaskCard}`,
					method: 'PUT',
					body: {
						imgUlr,
					},
				};
			},

			invalidatesTags: ['Lists'],
		}),

		addCommentTaskCard: builder.mutation<CommentTypes, { commentValue: CommentTypes }>({
			query: (data) => {
				const { commentValue } = data;

				return {
					url: `/taskCard/comment`,
					method: 'POST',
					body: commentValue,
				};
			},
			invalidatesTags: ['Lists'],
		}),

		editCommentTaskCard: builder.mutation<
			CommentTypes,
			{ commentValue: string; idCard: string; idComment: string }
		>({
			query: (data) => {
				const { commentValue, idCard, idComment } = data;

				return {
					url: `/taskCard/comment/${idCard}`,
					method: 'PUT',
					body: {
						idComment,
						bodyComment: commentValue,
					},
				};
			},
			invalidatesTags: ['Lists'],
		}),

		deleteCommentTaskCard: builder.mutation<CommentTypes, { idCard: string; idComment: string }>({
			query: (data) => {
				const { idCard, idComment } = data;

				return {
					url: `/taskCard/comment-delete/${idCard}`,
					method: 'POST',
					body: {
						idComment,
					},
				};
			},
			invalidatesTags: ['Lists'],
		}),

		addLabelTaskCard: builder.mutation<LabelsTypes, { idCard: string; labelValues: LabelsTypes }>({
			query: (data) => {
				const { idCard, labelValues } = data;

				return {
					url: `/taskCard/label/${idCard}`,
					method: 'POST',
					body: labelValues,
				};
			},
			invalidatesTags: ['Lists'],
		}),

		deleteLabelTaskCard: builder.mutation<void, { idCard: string; idLabel: string }>({
			query: (data) => {
				const { idCard, idLabel } = data;

				return {
					url: `/taskCard/label-delete/${idCard}`,
					method: 'POST',
					body: {
						idLabel,
					},
				};
			},
			invalidatesTags: ['Lists'],
		}),

		pickImageTaskCard: builder.mutation<MemberType[], { idCard: string; members: MemberType[] }>({
			query: (data) => {
				const { idCard, members } = data;

				return {
					url: `/taskCard/member/${idCard}`,
					method: 'POST',
					body: { members },
				};
			},
			invalidatesTags: ['Lists'],
		}),

		searchMember: builder.query<MemberType[], string>({
			query: (idProject: string) => ({ url: `/taskCard/member/${idProject}` }),
		}),

		searchUser: builder.mutation<MemberType, { email: string }>({
			query: (data) => {
				const { email } = data;

				return {
					url: `/projects/collaborator`,
					method: 'POST',
					body: {
						email,
					},
				};
			},
		}),
	}),
});

export const {
	useGetListsQuery,
	useGetProjectQuery,
	useAddListMutation,
	useEditListMutation,
	useAddTaskCardMutation,
	useEditTaskCardMutation,
	useDeleteTaskCardMutation,
	useEditDescriptionTaskCardMutation,
	useEditImageTaskCardMutation,
	useAddCommentTaskCardMutation,
	useEditCommentTaskCardMutation,
	useDeleteCommentTaskCardMutation,
	useAddLabelTaskCardMutation,
	useDeleteLabelTaskCardMutation,
	usePickImageTaskCardMutation,
	useOrdenPositionTaskCardsMutation,
	useOrderTaskCardsOndragMutation,
	useSearchMemberQuery,
	useSearchUserMutation,
} = listApi;
