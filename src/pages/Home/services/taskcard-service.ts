import { AxiosRequestConfig } from 'axios';
import clientAxios from '@utils/clientAxios';
import { CardStateProps, TypeComment } from '@interfaces/';

export const addTaskCardService = async (card: CardStateProps) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.post('/taskCard', card);

	return { data };
};

export const editTaskCardService = async (nameCard: string, idTaskCard?: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.put(`/taskCard/${idTaskCard}`, { nameCard });

	return { data };
};

export const deleteTaskCardService = async (idTaskCard: string | undefined) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.delete(`/taskCard/${idTaskCard}`);
	return { data };
};

export const editDescriptionTaskCardService = async (description: string, idTaskCard?: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.put(`/taskCard/${idTaskCard}`, { description });

	return { data };
};

export const addCommentService = async (commentValue: TypeComment) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.post('/taskCard/comment', commentValue);

	return { data };
};

export const editCommentService = async (idCard: string, idComment: string, commentValue: string) => {
	const token = localStorage.getItem('token');
	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await clientAxios.put(`/taskCard/comment/${idCard}`, {
		id: idComment,
		bodyComment: commentValue,
	});

	return { data };
};
