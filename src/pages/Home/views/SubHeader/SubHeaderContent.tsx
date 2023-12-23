import { useState, memo } from 'react';
import { ImageProfile, FormCollabrator, Button } from '@components/';
import { PopoverCustom } from '@components/PopoverCustom';
import { MenuProject } from '@pages/Home/components/';
import { MemberType, ProjectTypes } from '@interfaces/';
import { IoAddOutline, IoApps, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	isShowMenuProject: boolean;
}

export const SubHeaderContent = memo(({ project, setIsShowMenuProject, isShowMenuProject }: Props) => {
	const [collaborator, setCollaborator] = useState({} as MemberType);

	return (
		<div className='sub-header-top flex justify-between gap-4 p-4'>
			<div className='flex flex-col md:flex-row w-full min-[460px]:w-auto gap-4'>
				{location.pathname !== '/' && (
					<>
						<span className='border-neutral-700 h-[40px] flex items-center justify-center'>
							<p className='text-white font-medium capitalize'>{project.name}</p>
						</span>
					</>
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

					<div className='add-user'>
						<PopoverCustom preferredPosition='bottom'>
							<PopoverCustom.PopoverContent>
								{(onClose) => (
									<>
										<PopoverCustom.Trigger>
											<Button
												className='h-full '
												colorCustom='bg-blue-500'
												paddingCustom='px-2 py-[6px]'>
												<IoAddOutline
													className='text-neutral-200'
													size={20}
												/>
											</Button>
										</PopoverCustom.Trigger>

										<PopoverCustom.Body>
											<FormCollabrator
												collaborator={collaborator}
												setCollaborator={setCollaborator}
											/>
										</PopoverCustom.Body>
									</>
								)}
							</PopoverCustom.PopoverContent>
						</PopoverCustom>
					</div>
				</div>
			</div>

			<div className='flex flex-col md:flex-row w-full min-[460px]:w-auto gap-4'>
				<PopoverCustom preferredPosition='bottom-end'>
					<PopoverCustom.PopoverContent>
						{(onClose) => (
							<>
								<PopoverCustom.Trigger>
									<Button className='flex items-center'>
										<IoLockClosed className='text-neutral-200 mr-2' />
										<span className='text-neutral-200 capitalize mr-1'>{project.type}</span>
									</Button>
								</PopoverCustom.Trigger>

								<PopoverCustom.Body>
									<div className='bg-neutral-700 p-3 rounded-md'>
										<p className='text-white text-sm'>This is a project {project.type}</p>
									</div>
								</PopoverCustom.Body>
							</>
						)}
					</PopoverCustom.PopoverContent>
				</PopoverCustom>

				<Button
					className='flex items-center'
					onClick={() => setIsShowMenuProject(true)}>
					<IoEllipsisHorizontalSharp className='text-neutral-200 mr-2' />
					<span className='text-neutral-200 w-max'>Show Menu</span>
				</Button>
			</div>

			<MenuProject
				project={project}
				isShowMenuProject={isShowMenuProject}
				setIsShowMenuProject={setIsShowMenuProject}
			/>
		</div>
	);
});
