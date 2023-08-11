import { useEffect, useState } from 'react';
import { deleteCollabrator, editMenuBoard } from '@redux/home/slices/listsSlice';
import { useAppDispatch, useAuthProvider } from '@hooks/';
import { ImageProfile, LabelElement } from '@components/';
import { ProjectTypes } from '@interfaces/';
import {
	IoClose,
	IoDocumentText,
	IoDocumentTextOutline,
	IoPencilSharp,
	IoPersonCircle,
} from 'react-icons/io5';
import './MenuProject.css';

interface Props {
	project: ProjectTypes;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuProject = ({ project, setIsShowMenuProject }: Props) => {
	const [values, setValues] = useState({
		name: '',
		description: '',
	});
	const { auth } = useAuthProvider();
	const dispatch = useAppDispatch();

	const handleSubmitChanges = async () => {
		if (
			values.description.trim() === project.description?.trim() &&
			values.name.trim() === project.name.trim()
		) {
			console.log('No Cambios');
			return;
		}

		dispatch(editMenuBoard(project._id, values));
	};

	useEffect(() => {
		if (project._id) {
			setValues({ name: project.name, description: project.description! });
		}
	}, [project]);

	return (
		<div className='menu-project-content bg-neutral-800 overflow-x-hidden overflow-y-scroll w-full py-3 pl-3'>
			{/* <span
				className='text-white text-xs block bg-red-600 p-1 rounded-md cursor-pointer'
				onClick={() => console.log('Eliminando Proyecto')}>
				Eliminar Proyecto
			</span> */}

			<div className='flex justify-between p-2 border-b border-neutral-600'>
				<input
					type='text'
					className='flex-1 text-white font-medium text-lg bg-transparent focus-visible:outline-0'
					value={values.name}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
					onBlur={handleSubmitChanges}
				/>

				<span
					onClick={() => setIsShowMenuProject(false)}
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
							className='mr-3'
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
							classname='border-solid border-neutral-700 border-2 ml-2'>
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
						onBlur={handleSubmitChanges}
					/>
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
							project?.collaborators.map((collaborator) => (
								<li
									className='py-3 flex justify-between'
									key={collaborator._id}>
									<div className='members flex items-center cursor-pointer  flex-1'>
										<ImageProfile
											name={collaborator.name}
											color={collaborator.colorImg}
											className='mr-3'
										/>
										<span className='text-white font-medium flex-1'>{collaborator.name}</span>
									</div>

									<button
										className='py-1 px-2 text-red-600 border border-red-600 rounded-lg'
										onClick={() => dispatch(deleteCollabrator(project?._id, collaborator._id))}>
										Remove
									</button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
};
