import { useState } from 'react';
import { useSearchUserMutation, useAddCollaboratorProjectMutation } from '@redux/home/apis';
import { ImageProfile } from '@components/';
import { useProvider } from '@hooks/';
import { MemberType } from '@interfaces/';
import { IoSearchSharp } from 'react-icons/io5';

interface Props {
	collaborator: MemberType;
	setCollaborator: React.Dispatch<React.SetStateAction<MemberType>>;
}

export const FormCollabrator = ({ collaborator, setCollaborator }: Props) => {
	const [email, setEmail] = useState('');
	const { project } = useProvider();
	const [searchUser] = useSearchUserMutation();
	const [addCollaboratorProject] = useAddCollaboratorProjectMutation();

	const handleSearchUser = async () => {
		if (!email.includes('@') || !email.includes('.com')) {
			return;
		}

		await searchUser({ email })
			.unwrap()
			.then((response) => {
				setCollaborator(response);
				setEmail('');
			})
			.catch((error) => console.log(error));
	};

	const handleAddCollaborator = async () => {
		await addCollaboratorProject({ idProject: project._id, email: collaborator.email });
	};

	return (
		<div className='relative z-50 add-collaborator bg-neutral-700 transition-opacity p-3 w-80 rounded-md'>
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
						<span className='text-white font-medium flex-1 text-base'>{collaborator.name}</span>
					</div>
				)}
			</div>
		</div>
	);
};
