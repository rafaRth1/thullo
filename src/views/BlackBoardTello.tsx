import clientAxios from '../config/clientAxios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProvider } from '../hooks';
import { ModalFormCreateList, AddElementLabel, ListCard, Spinner } from '../components';

export const BlackBoardTello = () => {
	const [isDragging, setIsDragging] = useState(false);
	const { lists, setLists, showModalFormList, setAlertHigh, loading, setLoading, project, setProject } =
		useProvider();
	const { id } = useParams();

	const handleDragging = (dragging: boolean) => setIsDragging(dragging);

	useEffect(() => {
		const getLists = async () => {
			try {
				const token = localStorage.getItem('token');

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};

				const { data } = await clientAxios(`/list/${id}`, config);
				setProject(data.project);
				setLists(data.lists);
				setLoading(false);
			} catch (error) {
				setAlertHigh({
					msg: 'Error obtener listas',
					error: true,
				});
			}
		};

		getLists();
	}, []);

	return (
		<main className='relative grow p-2'>
			{loading ? (
				<Spinner />
			) : (
				<div className='lists flex overflow-x-auto absolute inset-0'>
					{lists.map((list) => (
						<ListCard
							key={list._id}
							list={list}
							isDragging={isDragging}
							handleDragging={handleDragging}
						/>
					))}

					<div className='contenedor-list'>
						<AddElementLabel
							text='Add Another List'
							handleDispatch={showModalFormList}
						/>
					</div>
				</div>
			)}

			<ModalFormCreateList />
		</main>
	);
};
