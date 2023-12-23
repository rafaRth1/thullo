import { useEffect, useState } from 'react';
import { deleteCollabrator, editMenuBoard } from '@redux/home/slices/listsSlice';
import { useAppDispatch, useAuthProvider } from '@hooks/';
import { ImageProfile, LabelElement } from '@components/';
import { ProjectTypes } from '@interfaces/';
import {
	IoClose,
	IoCloseOutline,
	IoDocumentText,
	IoDocumentTextOutline,
	IoPencilSharp,
	IoPeopleOutline,
	IoPersonCircle,
	IoPersonOutline,
} from 'react-icons/io5';
import './MenuProject.css';

interface Props {
	project: ProjectTypes;
	isShowMenuProject: boolean;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuProject = ({ project, isShowMenuProject, setIsShowMenuProject }: Props) => {
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
		<div
			className={`fixed right-0 top-[70px] z-40 transition-all duration-200 h-[90vh] bg-neutral-800 p-4 rounded-lg w-full min-[420px]:max-w-sm shadow-[0_5px_20px_-5px_rgba(0,0,0,0.4)] flex flex-col ${
				isShowMenuProject ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
			}`}>
			{/* <span
				className='text-white text-xs block bg-red-600 p-1 rounded-md cursor-pointer'
				onClick={() => console.log('Eliminando Proyecto')}>
				Eliminar Proyecto
			</span> */}

			<div className='flex items-center justify-between p-2 border-b border-neutral-600'>
				<input
					type='text'
					className='flex-1 text-white font-medium text-lg bg-transparent focus-visible:outline-0'
					value={values.name}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
					onBlur={handleSubmitChanges}
				/>

				<button
					className='cursor-pointer p-1 bg-transparent rounded-3xl hover:bg-neutral-700'
					onClick={() => setIsShowMenuProject(false)}>
					<IoCloseOutline
						className='text-white '
						size={24}
					/>
				</button>
			</div>

			<div className='author-project flex flex-col overflow-y-auto h-full my-3'>
				<div className='flex items-center gap-3'>
					<IoPersonOutline
						size={22}
						className='text-neutral-400'
					/>
					<h3 className='text-neutral-400 text-sm'>Made By</h3>
				</div>

				<div className='flex items-center gap-3 mt-3'>
					<div className='photo-creator'>
						<ImageProfile
							name={auth.name}
							color={auth.colorImg}
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
								size={22}
								className='mr-3'
							/>
							<span>Description</span>
						</div>
					</div>
				</div>

				<div className='description-body'>
					<textarea
						style={{ minHeight: '300px', maxHeight: '300px' }}
						className='w-full p-2 mt-3 bg-transparent text-white focus-visible:outline-none resize-none'
						placeholder='Write a description...'
						name='description'
						value={values.description}
						onChange={(e) => setValues({ ...values, description: e.target.value })}
						onBlur={handleSubmitChanges}
					/>
				</div>

				<div className='team-members'>
					<div className='header-members'>
						<div className='flex items-center gap-3 text-neutral-400 text-sm'>
							<IoPeopleOutline size={22} />
							<span>Team</span>
						</div>
					</div>

					<ul className='list-members'>
						{!!project.collaborators &&
							project?.collaborators.map((collaborator) => (
								<li
									className='mt-3 flex justify-between'
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
										className='text-[#f21261] font-medium border border-[#f21261] rounded-lg py-1 px-2 '
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
