import { CardBoard, ModalFormProject } from '@pages/home12/components';
import { useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { Spinner } from '@components/';
import { useGetProjectsQuery } from '@redux/home/apis/project-api';
import { IoAdd } from 'react-icons/io5';

export const BoardsPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { data: projects = [], isLoading } = useGetProjectsQuery();

	return (
		<div className='content-list-board container mx-auto mt-10 p-4 overflow-y-auto'>
			<div className='header-list flex justify-between items-center w-full mb-10'>
				<h1 className='text-white text-xl font-medium'>Tus proyectos</h1>

				<Button
					color='primary'
					onClick={() => onOpen()}>
					<IoAdd
						size={20}
						className='text-white'
					/>
					<p>Crear proyecto</p>
				</Button>
			</div>

			{isLoading ? (
				<Spinner className='h-72' />
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
				isOpen={isOpen}
				onOpen={onOpen}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
};
