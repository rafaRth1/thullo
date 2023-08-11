import { useEffect, useState } from 'react';
import { fetchGetProjects } from '@redux/home/slices/projectslice';
import { useAppDispatch, useAppSelector } from '@hooks/';
import { CardBoard, ModalFormProject } from '@pages/Home/components/';
import { Modal, Spinner } from '@components/';
import { IoAdd } from 'react-icons/io5';

export const BoardsPage = () => {
	const [showModal, setShowModal] = useState(false);
	const { projects, loading } = useAppSelector((state) => state.projects);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchGetProjects());
	}, []);

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

			{loading ? (
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
				<ModalFormProject setShowModal={setShowModal} />
			</Modal>
		</div>
	);
};
