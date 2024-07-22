import { useEffect, useState } from 'react';
import { Avatar, Button, Input } from '@nextui-org/react';
import { useAppDispatch, useAuthProvider } from '@hooks/';
import { deleteCollabrator, editMenuBoard } from '@redux/home/slices/list-slice';
import { ProjectTypes } from '@interfaces/';
import { IoCloseOutline, IoDocumentTextOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import './menu-project.css';

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
		if (values.description.trim() === project.description?.trim() && values.name.trim() === project.name_board.trim()) {
			return;
		}

		dispatch(editMenuBoard(project._id, values));
	};

	useEffect(() => {
		if (project._id) {
			setValues({ name: project.name_board, description: project.description! });
		}
	}, [project]);

	return (
		<div
			className={`fixed right-0 top-[70px] z-40 transition-all duration-200 h-[90vh] bg-[#18181a] rounded-lg w-full min-[420px]:max-w-sm shadow-[0_5px_20px_-5px_rgba(0,0,0,0.4)] flex flex-col ${
				isShowMenuProject ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
			}`}>
			{/* <span
				className='text-white text-xs block bg-red-600 p-1 rounded-md cursor-pointer'
				onClick={() => console.log('Eliminando Proyecto')}>
				Eliminar Proyecto
			</span> */}

			<div className='flex items-center p-4 border-b border-neutral-600'>
				<Input
					type='text'
					value={values.name}
					classNames={{ inputWrapper: 'bg-transparent' }}
					onChange={(e) => setValues({ ...values, name: e.target.value })}
					onBlur={handleSubmitChanges}
				/>

				<button
					className='cursor-pointer absolute right-3 p-1 bg-transparent rounded-3xl hover:bg-neutral-700'
					onClick={() => setIsShowMenuProject(false)}>
					<IoCloseOutline
						className='text-white'
						size={24}
					/>
				</button>
			</div>

			<div className='author-project flex flex-col overflow-y-auto h-full  p-4'>
				<div className='flex items-center gap-3'>
					<IoPersonOutline
						size={22}
						className='text-neutral-400'
					/>
					<h3 className='text-neutral-400 text-sm'>Hecho por</h3>
				</div>

				<div className='flex items-center gap-3 mt-3'>
					<div className='photo-creator'>
						<Avatar
							name={auth.name}
							classNames={{ base: `rounded-md` }}
							style={{ backgroundColor: auth.colorImg }}
						/>
					</div>

					<div className='flex flex-col'>
						<p>{auth.name}</p>
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
							<p>Description</p>
						</div>
					</div>
				</div>

				<div className='description-body'>
					<textarea
						style={{ minHeight: '300px', maxHeight: '300px' }}
						className='w-full p-2 mt-3 bg-transparent focus-visible:outline-none resize-none'
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
							<p>Equipo de trabajo</p>
						</div>
					</div>

					<ul className='list-members'>
						{!!project.collaborators &&
							project?.collaborators.map((collaborator) => (
								<li
									className='mt-3 flex justify-between'
									key={collaborator._id}>
									<div className='members flex items-center cursor-pointer  flex-1'>
										<Avatar
											name={collaborator.name}
											classNames={{ base: `rounded-md mr-3` }}
											style={{ backgroundColor: collaborator.colorImg }}
										/>

										<p className='flex-1'>{collaborator.name}</p>
									</div>

									<Button
										color='danger'
										onClick={() => dispatch(deleteCollabrator(project?._id, collaborator._id))}>
										Remove
									</Button>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
};
