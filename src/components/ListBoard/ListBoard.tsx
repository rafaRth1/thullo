import { useState } from 'react';
import { useFetch } from '../../hooks';
import { CardBoard, Modal, ModalFormBoard, Spinner } from '..';
import { ProjectTypes } from '../../interfaces';
import { IoAdd } from 'react-icons/io5';

export const ListBoard = (): JSX.Element => {
	const [showModal, setShowModal] = useState(false);
	const { data: projects, isLoading } = useFetch<ProjectTypes[]>('/projects');

	return (
		<div className='content-list-board container mx-auto mt-10 p-4'>
			<div className='header-list flex justify-between items-center w-full mb-10'>
				<span className='text-white text-lg'>All Boards</span>
				<button
					className='text-white flex items-center bg-blue-600 py-1 px-3 rounded-lg '
					onClick={() => setShowModal(!showModal)}>
					<IoAdd size={20} />
					<span>Add</span>
				</button>
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

			<Modal isShow={showModal}>
				<ModalFormBoard setShowModal={setShowModal} />
			</Modal>
		</div>
	);
};
