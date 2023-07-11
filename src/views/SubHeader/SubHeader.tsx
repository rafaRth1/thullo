import Popover from '../../components/Popover';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormCollabrator, ImageProfile, LabelElement, Modal } from '../../components';
import { useProvider } from '../../hooks';
import { MenuProject } from '../';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';

const objCollaborator = { name: '', email: '', _id: '', colorImg: '' };

export const SubHeader = (): JSX.Element => {
	const [collaborator, setCollaborator] = useState(objCollaborator);
	const { project, isShowMenuProject, setIsShowMenuProject } = useProvider();
	const { id } = useParams();
	const navigation = useNavigate();

	console.log();

	// const handleProjectDelete = async () => {
	// 	try {
	// 		const token = localStorage.getItem('token');

	// 		const config = {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		};

	// 		await clientAxios.delete(`/projects/${id}`, config);
	// 		navigation('/');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div className='sub-header-top flex items-center justify-between p-4'>
			<div className='flex items-center'>
				{!!project.type && (
					<Popover preferredPosition='right'>
						<Popover.Trigger>
							<div className='bg-yellow-600 hover:bg-yellow-700 cursor-pointer flex items-center mr-10 rounded-md py-1 px-2'>
								<span className='text-white capitalize mr-1'>{project.type}</span>
								<IoLockClosed className='text-neutral-200' />
							</div>
						</Popover.Trigger>

						<Popover.Content>
							<div className='bg-neutral-700 p-2 rounded-md'>
								<p className='text-white'>This is a project private</p>
							</div>
						</Popover.Content>
					</Popover>
				)}

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
					<div className='add-user'>
						<Popover preferredPosition='right'>
							<Popover.Trigger>
								<span className='bg-blue-500 inline-flex items-center justify-center cursor-pointer object-cover rounded-md text-3xl w-9 h-9 '>
									<IoAddOutline
										className='text-neutral-200'
										size={20}
									/>
								</span>
							</Popover.Trigger>

							<Popover.Content>
								<FormCollabrator
									collaborator={collaborator}
									setCollaborator={setCollaborator}
								/>
							</Popover.Content>
						</Popover>
					</div>
				</div>
			</div>

			<LabelElement
				label='Show Menu'
				classname='bg-neutral-600'
				handleFunction={() => setIsShowMenuProject(true)}>
				<IoEllipsisHorizontalSharp className='text-neutral-200' />
			</LabelElement>

			<div
				className={`transition-all duration-200 h-[90vh] fixed flex ${
					isShowMenuProject ? 'right-0 pointer-events-auto' : '-right-full pointer-events-none'
				} rounded-md top-[70px] z-40 min-w-[300px] w-[380px]`}>
				<MenuProject />
			</div>
		</div>
	);
};
