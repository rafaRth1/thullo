import clientAxios from '@utils/client-axios';
import { AxiosRequestConfig } from 'axios';

export const getProjectsService = (config: AxiosRequestConfig) => {
	return clientAxios('/projects', config);
};

export const createProjectService = (project: { name: string; name_img: string; type: string }, config: AxiosRequestConfig) => {
	return clientAxios.post('/projects', project, config);
};

export const editProjectService = (
	idProject: string,
	newValuesBoard: { name: string; description: string },
	config: AxiosRequestConfig
) => {
	return clientAxios.put(
		`/projects/${idProject}`,
		{
			name: newValuesBoard.name,
			description: newValuesBoard.description,
		},
		config
	);
};

export const deleteCollaboratorService = (idProject: string, idCollaborator: string, config: AxiosRequestConfig) => {
	return clientAxios.post(`/projects/delete-collaborator/${idProject}`, { id: idCollaborator }, config);
};

export const destroyImageService = (public_id: string) => {
	return clientAxios.post('/projects/image-delete', { public_id });
};
