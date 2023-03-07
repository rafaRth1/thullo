import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { useProvider } from '../hooks';
import { Spinner, ListTaskCard } from '../components';
import { Container } from 'react-smooth-dnd';
import { applyDrag } from '../utils';

export const BlackBoardTello = (): JSX.Element => {
	const { lists, setLists, showModalFormList, setAlertHigh, loading, setLoading, setProject } =
		useProvider();

	const { id } = useParams();

	const onColumnDrop = (dropResult: any) => {
		const project = Object.assign({}, lists);
		project.lists = applyDrag(project.lists, dropResult);
		setLists(project);
	};

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
				setLists({ lists: data.lists });
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
				<div className='card-scene'>
					<Container
						onDrop={onColumnDrop}
						orientation='horizontal'
						dragHandleSelector='.column-drag-handle'
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'cards-drop-preview',
						}}>
						{lists.lists.map((list: any) => (
							<ListTaskCard
								key={list._id}
								list={list}
								lists={lists}
								setLists={setLists}
							/>
						))}
					</Container>
				</div>
			)}
		</main>
	);
};
