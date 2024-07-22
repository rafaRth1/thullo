import { useState } from 'react';
import { useSearchUserMutation, useAddCollaboratorProjectMutation } from '@redux/home/apis';
import { Avatar, Button, Input } from '@nextui-org/react';
import { useProvider } from '@hooks/';
import { MemberType } from '@interfaces/';

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
		<div className='relative z-50 add-collaborator transition-opacity p-2 w-80 rounded-md'>
			<div className='add-collaborator-header'>
				<p className='text-white font-medium mb-4'>Invitar al proyecto</p>

				<Input
					type='text'
					name='email'
					label='Ingrese Correo'
					className='mb-4'
					value={email}
					onValueChange={setEmail}
				/>

				<Button
					color='primary'
					type='button'
					className='w-full'
					onClick={handleSearchUser}>
					Buscar usuario
				</Button>
			</div>

			{collaborator.email && (
				<div className='result-collaborator mt-4'>
					<div
						className='collaborator flex items-center cursor-pointer p-1 hover:opacity-80 transition-all'
						onClick={handleAddCollaborator}>
						<Avatar
							key={collaborator._id}
							name={collaborator.name}
							classNames={{ base: `rounded-md mr-5` }}
							style={{ backgroundColor: collaborator.colorImg }}
						/>
						<p className='text-white flex-1 text-base'>{collaborator.name}</p>
					</div>
				</div>
			)}
		</div>
	);
};
