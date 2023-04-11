import clientAxios from '../config/clientAxios';
import { useEffect, useState } from 'react';
import { CardBoard, Modal, ModalCreateBoard } from '.';
import { useProvider } from '../hooks';
import { IoAdd } from 'react-icons/io5';

export const ListBoard = (): JSX.Element => {
	const [showModal, setShowModal] = useState(false);
	const { projects, setProjects } = useProvider();

	useEffect(() => {
		const getProjects = async () => {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await clientAxios('/projects', config);
				setProjects(data);
			} catch (error) {
				console.log(error);
			}
		};

		getProjects();
	}, []);

	return (
		<div className='content-list-board contenedor mx-auto mt-10'>
			<div className='header-list flex justify-between items-center w-full mb-10 mx-3'>
				<span className='text-white text-xl'>All Boards</span>
				<button
					className='text-white flex items-center bg-blue-600 py-1 px-3 rounded-lg '
					onClick={() => setShowModal(!showModal)}>
					<IoAdd size={15} />
					<span className='text-sm'>Add</span>
				</button>
			</div>

			<div className='list-board flex flex-wrap mx-5 gap-11 justify-center sm:mx-5 sm:gap-7 md:mx-5 md:gap-7 md:justify-start lg:gap-11 lg:mx-0 '>
				{projects.map((project) => (
					<CardBoard
						key={project._id}
						project={project}
					/>
				))}
			</div>

			<Modal>
				{showModal ? (
					<ModalCreateBoard
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				) : null}
			</Modal>
		</div>
	);
};