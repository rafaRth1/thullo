import { CardBoard, ModalFormProject } from '@pages/Home/components/';
import { useToggle } from '@hooks/';
import { Button, Spinner } from '@components/';
import { useGetProjectsQuery } from '@redux/home/apis/project-api';
import { IoAdd } from 'react-icons/io5';

export const BoardsPage = () => {
	const [isOpenFormProject, onOpenFormProject] = useToggle();
	const { data: projects = [], isLoading } = useGetProjectsQuery();

	return (
		<div className='content-list-board container mx-auto mt-10 p-4'>
			<div className='header-list flex justify-between items-center w-full mb-10'>
				<span className='text-white text-lg'>All Boards</span>

				<Button
					className='flex'
					colorCustom='bg-blue-600'
					onClick={onOpenFormProject}>
					<IoAdd
						size={20}
						className='text-white'
					/>
					<span className='text-white ml-2'>Add</span>
				</Button>
			</div>

			{isLoading ? (
				<Spinner />
			) : (
				<div className='list-board flex flex-wrap justify-center sm:justify-start'>
					{projects?.map((project) => (
						<CardBoard
							key={project._id}
							project={project}
						/>
					))}
				</div>
			)}

			<ModalFormProject
				isOpenFormProject={isOpenFormProject}
				onOpenFormProject={onOpenFormProject}
			/>
		</div>
	);
};
