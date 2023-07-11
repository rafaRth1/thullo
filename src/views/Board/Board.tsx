import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@sntxx/react-smooth-dnd';
import { useProvider } from '../../hooks';
import { applyDrag } from '../../utils';
import {
	Spinner,
	AddElementLabel,
	ModalRename,
	TaskCardList,
	Modal,
	ModalFormList,
	ModalFormCard,
} from '../../components';
import './Board.css';
import { FormCardProvider } from '../../context';

export const Board = (): JSX.Element => {
	const { id } = useParams();
	const {
		lists,
		setLists,
		loading,
		getProject,
		getLists,
		isShowModalRename,
		isShowModalFormList,
		isShowModalFormCard,
		setIsShowModalFormList,
	} = useProvider();

	const onColumnDrop = (dropResult: {
		addedIndex: number | null;
		payload?: undefined;
		removedIndex: number | null;
	}) => {
		const project = Object.assign({}, lists);
		project.lists = applyDrag(project.lists, dropResult);
		setLists(project);
	};

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();
		getProject(id, cancelToken);

		return () => {
			cancelToken.cancel();
		};
	}, []);

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();
		getLists(id, cancelToken);

		return () => {
			cancelToken.cancel();
		};
	}, []);

	return (
		<main className='relative grow'>
			{loading ? (
				<Spinner />
			) : (
				<div className='board-main absolute inset-0'>
					<Container
						onDrop={onColumnDrop}
						orientation='horizontal'
						style={{ height: '100%' }}
						dragHandleSelector='.column-drag-handle'
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'cards-drop-preview',
						}}>
						{lists.lists.map((list) => (
							<TaskCardList
								key={list._id}
								list={list}
							/>
						))}

						<div className='smooth-dnd-draggable-wrapper'>
							<div className='contenedor-list'>
								<AddElementLabel
									text='Add Another List'
									handleDispatch={() => setIsShowModalFormList(true)}
								/>
							</div>
						</div>
					</Container>

					<Modal isShow={isShowModalFormList}>
						<ModalFormList />
					</Modal>

					<Modal isShow={isShowModalFormCard}>
						<FormCardProvider>
							<ModalFormCard />
						</FormCardProvider>
					</Modal>

					<Modal isShow={isShowModalRename}>
						<ModalRename />
					</Modal>
				</div>
			)}
		</main>
	);
};
