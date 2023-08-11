import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@sntxx/react-smooth-dnd';
import { useAppDispatch, useAppSelector, useProvider } from '@hooks/';
import { FormCardProvider } from '@context/';
import { Spinner, AddElementLabel, Modal } from '@components/';
import { SubHeader } from '@pages/Home/views/';
import { ModalCreateCard, TaskCardList, ModalFormList, ModalFormCard } from '@pages/Home/components';
import { fetchProjectAndLists, fetchProjectAndListsObject } from '@redux/home/slices/listsSlice';
import { applyDrag } from '@utils/';
import './BoardPage.css';

export const BoardPage = (): JSX.Element => {
	const [isShowModalFormList, setIsShowModalFormList] = useState(false);
	const [isShowModalCreateCard, setIsShowModalCreateCard] = useState(false);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const { lists: lists1, setLists, startProject } = useProvider();
	const { lists, loading } = useAppSelector((state) => state.lists);
	const { id } = useParams();
	const dispatch = useAppDispatch();

	// const onColumnDrop = (dropResult: {
	// 	addedIndex: number | null;
	// 	payload?: undefined;
	// 	removedIndex: number | null;
	// }) => {
	// 	const project = { ...lists };
	// 	project.lists = applyDrag(project.lists, dropResult);
	// 	setLists(project);
	// };

	// useEffect(() => {
	// 	const controller = new AbortController();
	// 	startProject(controller, id, id);

	// 	return () => {
	// 		controller.abort();
	// 	};
	// }, [id]);

	useEffect(() => {
		const controller = new AbortController();

		dispatch(fetchProjectAndLists(controller, id));
		// dispatch(fetchProjectAndListsObject(controller, id));

		return () => {
			controller.abort();
		};
	}, [id]);

	return (
		<div className='flex flex-col flex-1'>
			<SubHeader />

			<main className='relative grow'>
				{loading ? (
					<Spinner />
				) : (
					<div className='board-main absolute inset-0'>
						<Container
							// onDrop={onColumnDrop}
							orientation='horizontal'
							style={{ height: '100%' }}
							dragHandleSelector='.column-drag-handle'
							dropPlaceholder={{
								animationDuration: 150,
								showOnTop: true,
								className: 'cards-drop-preview',
							}}>
							{lists.map((list) => (
								<TaskCardList
									key={list._id}
									list={list}
									setIsShowModalCreateCard={setIsShowModalCreateCard}
									setIsShowModalFormCard={setIsShowModalFormCard}
									setIsShowModalFormList={setIsShowModalFormList}
								/>
							))}

							{/* {lists1.map((list) => (
								<TaskCardList
									key={list._id}
									list={list}
									setIsShowModalCreateCard={setIsShowModalCreateCard}
									setIsShowModalFormCard={setIsShowModalFormCard}
									setIsShowModalFormList={setIsShowModalFormList}
								/>
							))} */}

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
							<ModalFormList setIsShowModalFormList={setIsShowModalFormList} />
						</Modal>

						<Modal isShow={isShowModalCreateCard}>
							<ModalCreateCard setIsShowModalCreateCard={setIsShowModalCreateCard} />
						</Modal>

						<Modal isShow={isShowModalFormCard}>
							{/* Change between custom hook or context */}
							<FormCardProvider>
								<ModalFormCard setIsShowModalFormCard={setIsShowModalFormCard} />
							</FormCardProvider>
						</Modal>
					</div>
				)}
			</main>
		</div>
	);
};
