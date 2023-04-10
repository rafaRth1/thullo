import { useEffect, useState } from 'react';
import { useAuthProvider, useProvider } from '../hooks';
import clientAxios from '../config/clientAxios';
import { ImageProfile, LabelElement } from '../components';
import {
	IoClose,
	IoDocumentText,
	IoDocumentTextOutline,
	IoPencilSharp,
	IoPersonCircle,
} from 'react-icons/io5';

interface Props {
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuProject = ({ setShowMenu }: Props) => {
	const { project, setProject } = useProvider();
	const { auth } = useAuthProvider();
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

	return (
		<>
			{/* <span
				className='text-white text-xs block bg-red-600 p-1 rounded-md cursor-pointer'
				onClick={() => console.log('Eliminando Proyecto')}>
				Eliminar Proyecto
			</span> */}

			<div className='header-menu flex justify-between p-2 border-b border-neutral-600'>
				{/* <span>{project.name}</span> */}
				<input
					type='text'
					className='flex-1 text-white font-medium text-lg bg-transparent  focus-visible:outline-0'
					value={values.name}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
					onBlur={handleChangeNameBoard}
				/>

				<span
					onClick={() => setShowMenu(false)}
					className='cursor-pointer'>
					<IoClose
						size={25}
						color='white'
					/>
				</span>
			</div>

			<div className='author-project'>
				<div className='flex p-2'>
					<IoPersonCircle
						size={22}
						className='mr-2 text-neutral-400'
					/>
					<span className='text-neutral-400 text-sm'>Made By</span>
				</div>

				<div className='flex p-2'>
					<div className='photo-creator'>
						<ImageProfile
							name={auth.name}
							color={auth.colorImg}
							// imageProfile={auth.}
						/>
					</div>

					<div className='flex flex-col'>
						<p className='text-white font-medium'>{auth.name}</p>
						<span className='block text-neutral-400 text-sm'>on 4 July, 2020</span>
					</div>
				</div>

				<div className='description'>
					<div className='header-description flex mt-5'>
						<div className='flex items-center text-neutral-400 text-sm'>
							<IoDocumentTextOutline
								size={17}
								className='mr-3'
							/>
							<span>Description</span>
						</div>

						<LabelElement
							label='Edit'
							// handleFunction={() => setIsActiveDesc(!isActiveDesc)}
							classname='border-solid border-neutral-700 border-2'>
							<IoPencilSharp className='text-white' />
						</LabelElement>
					</div>
				</div>

				<div className='description-body'>
					<textarea
						style={{ minHeight: '318px', maxHeight: '318px' }}
						className='w-full p-2 mt-3 bg-transparent text-white'
						placeholder='Write a description...'
						name='description'
						value={values.description}
						onChange={(e) => setValues({ ...values, description: e.target.value })}
						onBlur={handleSubmitChanges}></textarea>
				</div>

				<div className='team-members'>
					<div className='header-members'>
						<div className='flex items-center text-neutral-400 text-sm'>
							<IoDocumentText
								size={17}
								className='mr-3'
							/>
							<span>Team</span>
						</div>
					</div>

					<ul className='list-members'>
						{!!project.collaborators &&
							project?.collaborators.map((collaborator: any) => (
								<li
									className='py-3 flex justify-between'
									key={collaborator._id}>
									<div className='members flex items-center cursor-pointer  flex-1'>
										<ImageProfile
											name={collaborator.name}
											color={collaborator.colorImg}
										/>
										<span className='text-white font-medium flex-1'>{collaborator.name}</span>
									</div>

									<button
										className='py-1 px-2 text-red-600 border border-red-600 rounded-lg'
										onClick={() => handleDeleteCollaborator(collaborator._id)}>
										Remove
									</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};
