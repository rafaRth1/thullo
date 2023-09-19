import { useState, memo } from 'react';
import Popover from '@components/Popover';
import { LabelElement, ImageProfile, FormCollabrator, Button } from '@components/';
import { MenuProject } from '@pages/Home/components/';
import { MemberType, ProjectTypes } from '@interfaces/';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	isShowMenuProject: boolean;
}

export const SubHeaderContent = memo(({ project, setIsShowMenuProject, isShowMenuProject }: Props) => {
	const [collaborator, setCollaborator] = useState({} as MemberType);

	return (
		<div className='sub-header-top flex items-center justify-between p-4'>
			<div className='flex items-center'>
				{!!project.type && (
					<Popover preferredPosition='right'>
						<Popover.PopoverContent>
							{(onClose) => (
								<>
									<Popover.Trigger>
										<Button className='flex items-center mr-3'>
											<IoLockClosed className='text-neutral-200 mr-2' />
											<span className='text-neutral-200 capitalize mr-1'>{project.type}</span>
										</Button>
									</Popover.Trigger>

									<Popover.Body>
										<div className='bg-neutral-700 p-3 rounded-md'>
											<p className='text-white text-sm'>This is a project private</p>
										</div>
									</Popover.Body>
								</>
							)}
						</Popover.PopoverContent>
					</Popover>
				)}

				<div className='allowed-group flex'>
					{project.collaborators?.map((collaborator) => (
						<ImageProfile
							key={collaborator._id}
							name={collaborator.name}
							color={collaborator.colorImg}
							// imageProfile={collaborator.imgUlr}
							className='mr-2'
						/>
					))}

					<div className='add-user flex'>
						<Popover preferredPosition='right'>
							<Popover.PopoverContent>
								{(onClose) => (
									<>
										<Popover.Trigger>
											<Button
												className='flex items-center'
												colorCustom='bg-blue-500'
												paddingCustom='px-2 py-[6px]'>
												<IoAddOutline
													className='text-neutral-200'
													size={20}
												/>
											</Button>
										</Popover.Trigger>

										<Popover.Body>
											<FormCollabrator
												collaborator={collaborator}
												setCollaborator={setCollaborator}
											/>
										</Popover.Body>
									</>
								)}
							</Popover.PopoverContent>
						</Popover>
					</div>
				</div>
			</div>

			{/* <LabelElement
				label='Show Menu'
				classname='bg-neutral-600'
				handleFunction={() => setIsShowMenuProject(true)}>
				<IoEllipsisHorizontalSharp className='text-neutral-200' />
			</LabelElement> */}

			<Button
				className='flex items-center'
				onClick={() => setIsShowMenuProject(true)}>
				<IoEllipsisHorizontalSharp className='text-neutral-200 mr-2' />
				<span className='text-neutral-200'>Show Menu</span>
			</Button>

			<div
				className={`top-[70px] z-40 min-w-[300px] w-[380px] transition-all duration-200 h-[100vh] fixed right-0 flex ${
					isShowMenuProject
						? 'translate-x-0 pointer-events-auto'
						: 'translate-x-full pointer-events-none'
				}`}>
				<MenuProject
					project={project}
					setIsShowMenuProject={setIsShowMenuProject}
				/>
			</div>
		</div>
	);
});
