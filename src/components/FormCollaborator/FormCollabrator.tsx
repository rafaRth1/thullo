import clientAxios from '../../utils/clientAxios';
import { useState } from 'react';
import { ImageProfile } from '../';
import { useAppSelector } from '../../hooks';
import { IoSearchSharp } from 'react-icons/io5';

export const FormCollabrator = ({ collaborator, setCollaborator }: any) => {
	const [email, setEmail] = useState('');
	const { project } = useAppSelector(state => state.lists);

	const handleSearchUser = async () => {
		if (!email.includes('@') || !email.includes('.com')) {
			return;
		}

		try {
			const { data } = await clientAxios.post('/projects/collaborator', { email: email });
			setCollaborator(data);
			setEmail('');
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

			console.log(data);

			// setProject(data);
			setCollaborator({ name: '', email: '', _id: '', colorImg: '' });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='add-collaborator bg-neutral-700 transition-opacity mt-3 p-3 w-80 rounded-xl z-40'>
			<div className='add-collaborator-header mb-2'>
				<span className='text-white font-medium'>Invite to Board</span>

				<p className='text-neutral-400 mb-2'>Search users you want to invite to</p>

				<div className='flex relative'>
					<input
						type='text'
						name='email'
						placeholder='Email User'
						className='text-neutral-300 bg-neutral-600 focus-visible:outline-none rounded py-1 px-2 w-full '
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<button
						className='bg-blue-600 cursor-pointer rounded p-1 ml-3'
						type='button'
						onClick={handleSearchUser}>
						<IoSearchSharp
							color='white'
							size={25}
						/>
					</button>
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
						<span className='text-white font-medium flex-1 text-lg'>{collaborator.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};
