import { useState, useRef } from 'react';
import { Draggable, Container } from '@sntxx/react-smooth-dnd';
import { useAppDispatch, useAppSelector, useProvider } from '@hooks/';
import Popover from '@components/Popover';
import { AddElementLabel } from '@components/';
import { applyDrag } from '@utils/';
import clientAxios from '@utils/clientAxios';
import { TaskCard } from '@pages/Home/components/';
import { CardStateProps, ListTypes } from '@interfaces/';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { deleteListThunk, updateListDrag } from '@redux/home/slices/listsSlice';

interface Props {
	list: ListTypes;
	setIsShowModalCreateCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
}

const card: CardStateProps = {
	_id: '',
	nameCard: '',
	description: '',
	imgUlr: '',
	members: [],
	attachments: [],
	comments: [],
	labels: [],
};

export const TaskCardList = ({
	list,
	setIsShowModalCreateCard,
	setIsShowModalFormCard,
	setIsShowModalFormList,
}: Props) => {
	const { lists, listsObject } = useAppSelector((state) => state.lists);
	const { setLists, setListCurrent, setCardUpdate, deleteList } = useProvider();
	const [listsMutable, setListsMutable] = useState([...lists]);
	const dispatch = useAppDispatch();

	const handleEditList = () => {
		setIsShowModalFormList(true);
		setListCurrent(list._id);
	};

	const handlerOpenFormEditCard = (card: CardStateProps) => {
		setIsShowModalFormCard(true);
		setCardUpdate(card);
	};

	// 	const lists: {
	// 		lists: ListTypes[];
	//   }

	// const onCardDrop = async (
	// 	columnId: string,
	// 	dropResult: { addedIndex: number | null; payload?: CardStateProps; removedIndex: number | null }
	// ) => {
	// 	if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
	// 		const listsUpdate = [...lists];
	// 		const [column] = listsUpdate.filter((list) => list._id === columnId);
	// 		const columnIndex = listsUpdate.indexOf(column);
	// 		const newColumn = column;

	// 		newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);
	// 		listsUpdate.splice(columnIndex, 1, newColumn);
	// 		// console.log(Object.isFrozen(listsUpdate));
	// 		console.log(listsUpdate);
	// 		setLists(listsUpdate);

	// 		if (dropResult.removedIndex === dropResult.addedIndex) {
	// 			return;
	// 		} else {
	// 			try {
	// 				// await clientAxios.put(`/list/update-list/${column._id}`, {
	// 				// 	taskCards: newColumn.taskCards,
	// 				// 	_idTaskCard: dropResult.payload?._id,
	// 				// });
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 	}
	// };

	// const getCardPayload = (columnId: string, index: number) => {
	// 	return lists.filter((list) => list._id === columnId)[0].taskCards[index];
	// };

	// const onCardDrop = async (
	// 	columnId: string,
	// 	dropResult: { addedIndex: number | null; payload?: CardStateProps; removedIndex: number | null }
	// ) => {
	// 	if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
	// 		const listUpdate = {
	// 			lists: [...listsObject.lists],
	// 		};
	// 		const [column] = listUpdate.lists.filter((list: any) => list._id === columnId);
	// 		const columnIndex = listUpdate.lists.indexOf(column);
	// 		const newColumn = { ...column };

	// 		newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);

	// 		listUpdate.lists.splice(columnIndex, 1, newColumn);
	// 		console.log(listUpdate);

	// 		// dispatch(updateListDrag(listsUpdate));
	// 		// console.log(listsUpdate);
	// 		// setLists(listsUpdate);

	// 		if (dropResult.removedIndex === dropResult.addedIndex) {
	// 			return;
	// 		} else {
	// 			try {
	// 				// await clientAxios.put(`/list/update-list/${column._id}`, {
	// 				// 	taskCards: newColumn.taskCards,
	// 				// 	_idTaskCard: dropResult.payload?._id,
	// 				// });
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 	}
	// };

	// const getCardPayload = (columnId: string, index: number) => {
	// 	return listsObject.lists.filter((list) => list._id === columnId)[0]?.taskCards[index];
	// };

	const onCardDrop = async (
		columnId: string,
		dropResult: { addedIndex: number | null; payload?: CardStateProps; removedIndex: number | null }
	) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			// const listsUpdate = [...lists];
			// let [column] = listsUpdate.filter((list: any) => list._id === columnId);
			// const columnIndex = listsUpdate.indexOf(column);
			// let newColumn = column;

			// newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);

			console.log(Object.isFrozen(listsMutable[0]));
			// listsUpdate.splice(columnIndex, 1, newColumn);

			// // console.log(Object.isFrozen(listsUpdate));
			// console.log(listsUpdate);

			// dispatch(updateListDrag({ dropResult, columnId }));
			// console.log(listsUpdate);
			// setLists(listsUpdate);

			if (dropResult.removedIndex === dropResult.addedIndex) {
				return;
			} else {
				try {
					// await clientAxios.put(`/list/update-list/${column._id}`, {
					// 	taskCards: newColumn.taskCards,
					// 	_idTaskCard: dropResult.payload?._id,
					// });
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const getCardPayload = (columnId: string, index: number) => {
		return lists.filter((list) => list._id === columnId)[0]?.taskCards[index];
	};

	return (
		<>
			<Draggable>
				<div className='contenedor-list'>
					<div className='content-list mb-5'>
						<div className='header-list px-2 flex justify-between items-center'>
							{/* <span className='column-drag-handle'>&#x2630;</span> */}
							<div className='flex-1 text-white'>{list.name}</div>

							<Popover preferredPosition='bottom-center'>
								<Popover.Trigger>
									<span>
										<IoEllipsisHorizontalSharp className='text-white cursor-pointer' />
									</span>
								</Popover.Trigger>

								<Popover.Content>
									<div
										className={`flex flex-col bottom-auto right-auto z-40 w-32 bg-neutral-700 rounded transition-opacity `}>
										<span
											className='text-yellow-500 hover:text-yellow-600 cursor-pointer text-md p-2'
											onClick={handleEditList}>
											Rename
										</span>

										<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>

										<span
											className='text-red-500 hover:text-red-600 cursor-pointer text-md p-2'
											onClick={() => dispatch(deleteListThunk(list._id))}>
											Delete this list
										</span>
									</div>
								</Popover.Content>
							</Popover>
						</div>
					</div>

					<Container
						orientation='vertical'
						groupName='col'
						onDrop={(e) => onCardDrop(list._id, e)}
						getChildPayload={(index) => getCardPayload(list._id, index)}
						dragClass='card-ghost'
						dropClass='card-ghost-drop'
						dropPlaceholder={{
							animationDuration: 250,
							showOnTop: true,
							className: 'drop-preview',
						}}>
						{list.taskCards.map((taskCard) => (
							<TaskCard
								key={taskCard._id}
								taskCard={taskCard}
								handlerOpenFormEditCard={handlerOpenFormEditCard}
							/>
						))}

						<div className='mt-2'>
							<AddElementLabel
								text='Add Another Card'
								handleDispatch={() => {
									setIsShowModalCreateCard(true), setCardUpdate(card), setListCurrent(list._id);
								}}
							/>
						</div>
					</Container>
				</div>
			</Draggable>
		</>
	);
};
