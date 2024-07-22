import { useState, memo } from 'react';
import { Avatar } from '@nextui-org/react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import { Button } from '@nextui-org/button';
import { FormCollabrator } from '@components/';
import { MenuProject } from '@pages/home/components';
import { MemberType, ProjectTypes } from '@interfaces/';
import { IoAddOutline, IoEllipsisHorizontalSharp, IoLockClosed } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	isShowMenuProject: boolean;
	isLoadingProject: boolean;
}

export const SubHeaderContent = memo(({ project, setIsShowMenuProject, isShowMenuProject, isLoadingProject }: Props) => {
	const [collaborator, setCollaborator] = useState({} as MemberType);

	return isLoadingProject ? (
		<div className='animate-pulse flex justify-between gap-3 p-4'>
			<div className='flex flex-col md:flex-row gap-6'>
				<div className='rounded-md bg-[#262627] h-10 w-[160px]' />
				<div className='rounded-md bg-[#262627] h-10 w-[160px]' />
			</div>

			<div className='flex flex-col md:flex-row gap-6'>
				<div className='rounded-md bg-[#262627] h-10 w-[160px]' />
				<div className='rounded-md bg-[#262627] h-10 w-[160px]' />
			</div>
		</div>
	) : (
		<div className='sub-header-top flex justify-between gap-4 p-4'>
			<div className='flex flex-col items-center md:flex-row w-full min-[460px]:w-auto gap-4'>
				{location.pathname !== '/' && <p className='text-white font-medium capitalize'>{project.name_board}</p>}

				<div className='allowed-group flex'>
					{project.collaborators?.map((collaborator) => (
						<Avatar
							key={collaborator._id}
							name={collaborator.name}
							classNames={{ base: `rounded-md mr-2` }}
							style={{ backgroundColor: collaborator.colorImg }}
						/>
					))}

					<div className='add-user'>
						<Popover placement='bottom'>
							<PopoverTrigger>
								<Button
									className='h-full px-[10px] py-[6px] rounded-md'
									color='primary'>
									<IoAddOutline
										className='text-neutral-200'
										size={20}
									/>
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<FormCollabrator
									collaborator={collaborator}
									setCollaborator={setCollaborator}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>

			<div className='flex flex-col md:flex-row w-full min-[460px]:w-auto gap-4'>
				<Popover placement='bottom'>
					<PopoverTrigger>
						<Button
							className='h-full px-[10px] py-[6px] rounded-md'
							color='primary'>
							<IoLockClosed className='mr-2' />
							<p className='capitalize mr-1'>{project.type}</p>
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className='p-3 rounded-md'>
							<p className='text-sm'>This is a project {project.type}</p>
						</div>
					</PopoverContent>
				</Popover>

				<Button
					className='flex items-center bg-[#262626]'
					onClick={() => setIsShowMenuProject(true)}>
					<IoEllipsisHorizontalSharp className='mr-2' />
					<p>Mostrar menu</p>
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
