import { AxiosRequestConfig } from 'axios';
import clientAxios from '@utils/clientAxios';

export const fetchProjectService = async (controller: AbortController, idProject?: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		signal: controller.signal,
	};

	const { data } = await clientAxios(`/projects/${idProject}`, config);

	return { data };
};

export const fetchListsService = async (controller: AbortController, idProject?: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		signal: controller.signal,
	};

	const { data } = await clientAxios(`/list/${idProject}`, config);
	return { data };
};

export const addListService = async (idProject: string | undefined, nameList: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.post(
		'/list',
		{
			name: nameList,
			project: idProject,
		},
		config
	);

	return { data };
};

export const editListService = async (idList: string, nameListUpdate: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.put(`/list/${idList}`, { name: nameListUpdate }, config);

	return { data };
};

export const deleteListService = async (idList: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.delete(`/list/${idList}`, config);

	return { data };
};
