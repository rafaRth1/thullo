import { AxiosRequestConfig } from 'axios';
import { Appthunk } from '../../../store';
import {
	createProjectService,
	destroyImageService,
	getProjectsService,
} from '@pages/Home/services/project-service';
import { addProject, getProjects, loadingError, loadingStart } from './projecSlice';

export const fetchGetProjects = (): Appthunk => {
	return async (dispatch) => {
		dispatch(loadingStart());

		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await getProjectsService(config);
			dispatch(getProjects(data));
		} catch (error) {
			dispatch(loadingError('Get the projects failed.'));
			console.log(error);
		}
	};
};

export const createProject = (project: { name: string; name_img: string; type: string }): Appthunk => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await createProjectService(project, config);
			dispatch(addProject(data));
		} catch (error) {
			dispatch(loadingError('Failed to create project.'));
			console.log(error);
		}
	};
};

export const destroyImage = (public_id: string): Appthunk => {
	return async (dispatch) => {
		try {
			const { data } = await destroyImageService(public_id);
			console.log(data); // FIX: handle response
		} catch (error) {
			dispatch(loadingError('Failed to detroy image'));
			console.log(error);
		}
	};
};
