import axios, { AxiosRequestConfig } from 'axios';
import clientAxios from '@utils/client-axios';
import { Appthunk } from '@redux/store';
import { deleteCollaboratorService, editProjectService } from '@pages/home12/services/project-service';
import { addListService, deleteListService, editListService, fetchProjectService } from '@pages/home12/services/list-service';
import {
	addComment,
	addList,
	addTaskCard,
	deleteList,
	deleteTaskCard,
	editList,
	editTaskCard,
	getProject,
	getProjectUdpate,
	loadingStart,
	startGetProjectAndLists,
} from './listSlice';
import {
	addCommentService,
	addTaskCardService,
	deleteTaskCardService,
	editDescriptionTaskCardService,
	editTaskCardService,
} from '@pages/home12/services/taskcard-service';
import { ListTypes, TaskCardTypes, CommentTypes } from '@interfaces/';

export const fetchProject = (controller: AbortController, idProject?: string): Appthunk => {
	return async (dispatch) => {
		dispatch(loadingStart());

		try {
			const project = await fetchProjectService(controller, idProject);
			dispatch(getProject(project.data));
		} catch (error) {
			// if (axios.isCancel(error)) {
			// 	// <== console.log('Request Canceled Clear');
			// } else {
			// 	// setAlertHigh({
			// 	// 	msg: 'Error obtener listas',
			// 	// 	error: true,
			// 	// });
			// 	console.log(error);
			// }
		}
	};
};

export const fetchProjectAndLists = (controller: AbortController, idProject?: string): Appthunk => {
	return async (dispatch) => {
		dispatch(loadingStart());

		try {
			const token = localStorage.getItem('token');
			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				signal: controller.signal,
			};

			const project = await clientAxios(`/projects/${idProject}`, config);
			const lists = await clientAxios(`/list/${idProject}`, config);

			await Promise.allSettled([project, lists]).then((response) => {
				dispatch(
					startGetProjectAndLists({
						project: response[0].status === 'fulfilled' && response[0].value.data,
						lists: response[1].status === 'fulfilled' && response[1].value.data,
					})
				);
			});
		} catch (error) {
			if (axios.isCancel(error)) {
				// <== console.log('Request Canceled Clear');
			} else {
				// setAlertHigh({
				// 	msg: 'Error obtener listas',
				// 	error: true,
				// });
				console.log(error);
			}
		}
	};
};

export const addListThunk = (idProject: string | undefined, nameList: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await addListService(idProject, nameList);
			dispatch(addList(data));
		} catch (error) {
			console.log('Error');
		}
	};
};

export const editListThunk = (idList: string, nameList: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await editListService(idList, nameList);
			dispatch(editList(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteListThunk = (idList: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await deleteListService(idList);
			dispatch(deleteList({ idList, ...data }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const addCardThunk = (card: TaskCardTypes, listCurrent: ListTypes): Appthunk => {
	return async (dispatch, getState) => {
		const listIndex = getState().lists.lists.indexOf(listCurrent);

		try {
			const { data } = await addTaskCardService(card);
			dispatch(addTaskCard({ data, listIndex }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const editCardThunk = (nameCard: string, listId?: string, idTaskCard?: string): Appthunk => {
	return async (dispatch, getState) => {
		try {
			const { data } = await editTaskCardService(nameCard, idTaskCard);
			dispatch(editTaskCard({ data, listId }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteCardThunk = (idTaskCard: string | undefined, listId?: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await deleteTaskCardService(idTaskCard);
			console.log(data);
			dispatch(deleteTaskCard({ idTaskCard, listId }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const editDesciptionTaskCardThunk = (description: string, listId?: string, idTaskCard?: string): Appthunk => {
	return async (dispatch, getState) => {
		try {
			const { data } = await editDescriptionTaskCardService(description, idTaskCard);
			dispatch(editTaskCard({ data, listId }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const addCommentThunk = (commentValue: CommentTypes, listId?: string, idTaskCard?: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await addCommentService(commentValue);
			dispatch(addComment({ data, listId, idTaskCard }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const editMenuBoard = (idProject: string, newValuesBoard: { name: string; description: string }): Appthunk => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await editProjectService(idProject, newValuesBoard, config);

			dispatch(getProjectUdpate(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteCollabrator = (idProject: string, idCollaborator: string): Appthunk => {
	return async (dispatch, getState) => {
		const project = getState().lists.project;

		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			await deleteCollaboratorService(idProject, idCollaborator, config);

			const updatedCollabators = project.collaborators.filter((collaborator) => collaborator._id !== idCollaborator);

			dispatch(getProjectUdpate({ collaborators: updatedCollabators }));
		} catch (error) {
			console.log(error);
		}
	};
};
