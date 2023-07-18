import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@sntxx/react-smooth-dnd';
import { useProvider } from '../../hooks';
import { applyDrag } from '../../utils';
import { FormCardProvider } from '../../context';
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

export const Board = (): JSX.Element => {
	const { id } = useParams();
	const {
		lists,
		setLists,
		loading,
		isShowModalRename,
		isShowModalFormList,
		isShowModalFormCard,
		setIsShowModalFormList,
		startProject,
	} = useProvider();

	const onColumnDrop = (dropResult: {
		addedIndex: number | null;
		payload?: undefined;
		removedIndex: number | null;
	}) => {
		const project = { ...lists };
		project.lists = applyDrag(project.lists, dropResult);
		setLists(project);
	};

	useEffect(() => {
		const controller = new AbortController();
		startProject(controller, id, id);

		return () => {
			controller.abort();
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
