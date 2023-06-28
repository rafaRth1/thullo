import clientAxios from '../../config/clientAxios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageProfile, LabelElement } from '../../components';
import { useAuthProvider, useProvider } from '../../hooks';
import { MenuProject } from '../MenuProject';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed, IoSearchSharp } from 'react-icons/io5';

const objCollaborator = { name: '', email: '', _id: '', colorImg: '' };

export const SubHeader = (): JSX.Element => {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [userSearch, setUserSearch] = useState('');
	const [collaborator, setCollaborator] = useState(objCollaborator);
	const { project, setProject } = useProvider();
	const { auth } = useAuthProvider();
	const { id } = useParams();
	const navigation = useNavigate();

	const handleProjectDelete = async () => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			await clientAxios.delete(`/projects/${id}`, config);
			navigation('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleFindSearch = async () => {
		try {
			const { data } = await clientAxios.post('/projects/collaborator', { email: userSearch });
			setCollaborator(data);
			setUserSearch('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddCollaborator = async () => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(
				`/projects/collaborator/${project._id}`,
				{
					email: collaborator.email,
				},
				config
			);

			setProject(data);
			setCollaborator({ name: '', email: '', _id: '', colorImg: '' });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='sub-header-top flex items-center justify-between p-4'>
			<div className='flex items-center'>
				<LabelElement
					label={project?.type}
					classname='mr-10 bg-neutral-700'>
					<IoLockClosed className='text-neutral-200' />
				</LabelElement>

				<div className='allowed-group flex'>
					{project.collaborators?.map((collaborator) => (
						<ImageProfile
							key={collaborator._id}
							name={collaborator.name}
							color={collaborator.colorImg}
							imageProfile={collaborator.imgUlr}
							className='mr-2'
						/>
					))}

					<div className='user-image-add'>
						<span
							className='bg-blue-500 inline-flex items-center justify-center cursor-pointer object-cover rounded-md text-3xl w-9 h-9 '
							onClick={() => setShowModal(!showModal)}>
							<IoAddOutline
								className='text-neutral-200'
								size={20}
							/>
						</span>

						<div
							className={`add-collaborator bg-neutral-700 absolute transition-opacity mt-3 p-3 w-80 rounded-xl z-40 ${
								showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
							}`}>
							<div className='add-collaborator-header mb-2'>
								<span className='text-white font-medium'>Invite to Board</span>

								<p className='text-neutral-400 mb-2'>Search users you want to invito to</p>

								<div className='flex relative'>
									<input
										type='text'
										placeholder='User...'
										className='py-1 px-2 w-full text-neutral-300 bg-neutral-600 rounded focus-visible:outline-none'
										value={userSearch}
										onChange={(e) => setUserSearch(e.target.value)}
									/>
									<span
										className='absolute right-0 p-1 rounded bg-blue-600 cursor-pointer'
										onClick={handleFindSearch}>
										<IoSearchSharp
											color='white'
											size={23}
										/>
									</span>
								</div>
							</div>

							<div className='result-collaborator'>
								{collaborator.email && (
									<div
										className='collaborator flex items-center cursor-pointer p-1 '
										onClick={handleAddCollaborator}>
										<ImageProfile
											name={collaborator.name}
											color={collaborator.colorImg}
											className='mr-3'
										/>
										<span className='text-white font-medium flex-1 text-lg'>
											{collaborator.name}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='relative'>
				<LabelElement
					label='Show Menu'
					classname='bg-neutral-600'
					handleFunction={() => setShowMenu(!showMenu)}>
					<IoEllipsisHorizontalSharp className='text-neutral-200' />
				</LabelElement>
			</div>

			<div
				className={`content-menu bg-neutral-800 transition-all h-full fixed top-20 z-40 ${
					showMenu ? 'right-0 pointer-events-auto' : '-right-full  pointer-events-none'
				}   py-1 px-3 rounded-md z-30`}
				style={{ minWidth: '377px' }}>
				<MenuProject setShowMenu={setShowMenu} />
			</div>
		</div>
	);
};
