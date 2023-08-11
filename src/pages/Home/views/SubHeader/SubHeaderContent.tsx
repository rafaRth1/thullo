import { useState, memo } from 'react';
import Popover from '@components/Popover';
import { LabelElement, ImageProfile, FormCollabrator } from '@components/';
import { MenuProject } from '@pages/Home/components/';
import { ProjectTypes } from '@interfaces/';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	isShowMenuProject: boolean;
}

const objCollaborator = { name: '', email: '', _id: '', colorImg: '' };

export const SubHeaderContent = memo(({ project, setIsShowMenuProject, isShowMenuProject }: Props) => {
	const [collaborator, setCollaborator] = useState(objCollaborator);

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
				<MenuProject
					project={project}
					setIsShowMenuProject={setIsShowMenuProject}
				/>
			</div>
		</div>
	);
});
