import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../hooks';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utils';
import {
	Spinner,
	ListTaskCard,
	ModalFormCreateCard,
	ModalFormCreateList,
	AddElementLabel,
	Modal,
	ModalRename,
} from '../../components';

import './Board.css';

export const Board = (): JSX.Element => {
	const { id } = useParams();
	const {
		lists,
		setLists,
		loading,
		getProject,
		getLists,
		isShowModalCard,
		showModalFormList,
		modalFormList,
		modalRename,
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
				<div className='board-main'>
					<Container
						onDrop={onColumnDrop}
						orientation='horizontal'
						dragHandleSelector='.column-drag-handle'
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'cards-drop-preview',
						}}>
						{lists.lists.map((list) => (
							<ListTaskCard
								key={list._id}
								list={list}
							/>
						))}
						<div className='smooth-dnd-draggable-wrapper'>
							<div className='contenedor-list'>
								<AddElementLabel
									text='Add Another List'
									handleDispatch={showModalFormList}
								/>
							</div>
						</div>
					</Container>

					<Modal>{modalFormList ? <ModalFormCreateList /> : null}</Modal>

					<Modal>{isShowModalCard ? <ModalFormCreateCard /> : null}</Modal>

					<Modal>{modalRename ? <ModalRename /> : null}</Modal>
				</div>
			)}
		</main>
	);
};
