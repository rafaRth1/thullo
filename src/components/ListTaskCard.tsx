import { useState, useEffect } from 'react';
import { useProvider } from '../hooks';
import { AddElementLabel, ModalFormCreateCard, ModalRename, TaskCard } from './';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../utils';
import { CardUpdateProps } from './ListCard/types/CardUpdateProps';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import clientAxios from '../config/clientAxios';

let card: CardUpdateProps = {
	id: '',
	nameCard: '',
	attachments: [],
	comments: [],
	description: '',
	imgUlr: '',
	labels: [],
	index: '',
};

export const ListTaskCard = ({ list, indexList }: any): JSX.Element => {
	const [taskCards, setTaskCards] = useState<any[]>(list.taskCards);
	const [isShowModalCard, setIsShowModalCard] = useState(false);
	const [modalRename, setModalRename] = useState(false);
	const [showMenuList, setShowMenuList] = useState(false);
	const { lists, setLists, setOverflow } = useProvider();
	const [cardUpdate, setCardUpdate] = useState(card);

	const handleEditCard = (card: any) => {
		setIsShowModalCard(true);
		setCardUpdate(card);
	};

	const handleEditList = () => {
		setModalRename(true);
	};

	const onCardDrop = async (columnId: any, dropResult: any) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			const project = Object.assign({}, lists);
			const [column] = project.lists.filter((p: any) => p._id === columnId);
			const columnIndex = project.lists.indexOf(column);

			const newColumn = Object.assign({}, column);
			newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);
			project.lists.splice(columnIndex, 1, newColumn);
			setLists(project);

			if (dropResult.removedIndex === dropResult.addedIndex) {
				return;
			} else {
				try {
					await clientAxios.put(`/list/update-list/${column._id}`, {
						taskCards: newColumn.taskCards,
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const getCardPayload = (columnId: any, index: any) => {
		return lists.lists.filter((p: any) => p._id === columnId)[0].taskCards[index];
	};

	useEffect(() => {
		setTaskCards(list.taskCards);
	}, [lists.lists]);

	return (
		<>
			<Draggable>
				<div className='contenedor-list relative'>
					<div className='content-list max-h-full flex flex-col'>
						<div className='header-list mb-5 flex justify-between items-center cursor-pointer'>
							<span className='column-drag-handle'>&#x2630;</span>
							<span className='flex-1 text-white'>{list.name}</span>

							<div className='relative'>
								<div>
									<IoEllipsisHorizontalSharp
										className='text-white'
										onClick={() => setShowMenuList(!showMenuList)}
									/>
								</div>

								<div
									className={`flex flex-col absolute left-0 z-40 w-32 bg-neutral-700 rounded transition-opacity ${
										showMenuList
											? 'opacity-100 pointer-events-auto'
											: 'opacity-0 pointer-events-none'
									}`}>
									<span
										className='text-yellow-500 hover:text-yellow-600 text-md p-2'
										onClick={handleEditList}>
										Rename
									</span>

									<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>
									<span
										className='text-red-500 hover:text-red-600 text-md p-2'
										onClick={() => console.log('handleDeleteList')}>
										Delete this list
									</span>
								</div>
							</div>
						</div>
					</div>
					<Container
						orientation='vertical'
						groupName='col'
						onDragStart={(e) => {
							// console.log('drag started', e);
						}}
						onDragEnd={(e) => {
							// console.log('drag end', e);
						}}
						onDrop={(e) => onCardDrop(list._id, e)}
						getChildPayload={(index) => getCardPayload(list._id, index)}
						dragClass='card-ghost'
						dropClass='card-ghost-drop'
						onDragEnter={() => {
							// console.log('drag enter:', column.id);
						}}
						onDragLeave={() => {
							// console.log('drag leave:', list.id);
						}}
						onDropReady={(p) => {
							// console.log('Drop ready: ', p);
						}}
						dropPlaceholder={{
							animationDuration: 150,
							showOnTop: true,
							className: 'drop-preview',
						}}>
						{list.taskCards.map((taskCard: any) => (
							<TaskCard
								key={taskCard._id}
								taskCard={taskCard}
								handleEditCard={handleEditCard}
							/>
						))}
					</Container>

					<div className='mt-5'>
						<AddElementLabel
							text='Add Another Card'
							handleDispatch={() => {
								setIsShowModalCard(!isShowModalCard), setOverflow(true), setCardUpdate(card);
							}}
						/>
					</div>

					<ModalFormCreateCard
						idList={list._id}
						list={list}
						isShowModalCard={isShowModalCard}
						setIsShowModalCard={setIsShowModalCard}
						cardUpdate={cardUpdate}
						cards={taskCards}
						setCards={setTaskCards}
					/>

					<ModalRename
						modalRename={modalRename}
						setModalRename={setModalRename}
						list={list}
						setShowMenuList={setShowMenuList}
					/>
				</div>
			</Draggable>
		</>
	);
};
