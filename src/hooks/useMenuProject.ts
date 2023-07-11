import clientAxios from '../config/clientAxios';
import { useEffect, useState } from 'react';
import { useProvider } from './useProvider';

export const useMenuProject = () => {
	const { project, setProject } = useProvider();
	const [values, setValues] = useState({
		name: '',
		description: '',
		collaborators: [],
	});

	const handleSubmitChanges = async () => {
		if (values.description === project.description) {
			return;
		} else {
			try {
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};
				const { data } = await clientAxios.put(
					`/projects/${project?._id}`,
					{
						name: values.name,
						description: values.description,
					},
					config
				);
				setValues({
					...values,
					name: data.name,
					description: data.description,
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleDeleteCollaborator = async (id: string) => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			await clientAxios.post(`/projects/delete-collaborator/${project._id}`, { id: id }, config);

			const projectUpdate = { ...project };
			projectUpdate.collaborators = projectUpdate.collaborators.filter(
				(collaborator: any) => collaborator._id !== id
			);

			setProject(projectUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeNameBoard = async () => {
		if (values.name === project.name) {
			console.log('Ningun cambio');
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await clientAxios.put(
				`/projects/${project?._id}`,
				{
					name: values.name,
				},
				config
			);

			setValues({
				...values,
				name: data.name,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (project?._id) {
			setValues({ ...values, name: project.name, description: project?.description });
		}
	}, [project]);

	return {
		values,
		setValues,
		handleSubmitChanges,
		handleDeleteCollaborator,
		handleChangeNameBoard,
	};
};
