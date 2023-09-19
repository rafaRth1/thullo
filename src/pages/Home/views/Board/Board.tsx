import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useAppDispatch, useBoardProvider } from '@hooks/';
import { Button } from '@components/';
import { moveDrag, reorder } from '@utils/';
import { StrictModeDroppable, TaskCardList } from '@pages/Home/components';
import {
	listApi,
	useOrdenPositionTaskCardsMutation,
	useOrderTaskCardsOndragMutation,
} from '@redux/home/apis';
import { ListTypes } from '@interfaces/';
import { IoAddOutline } from 'react-icons/io5';

interface Props {
	onOpenFormCreateCard: () => void;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Board = memo(
	({ onOpenFormCreateCard, setIsShowModalFormCard, setIsShowModalFormList }: Props) => {
		const { listsArray, setListCurrent, listCurrent, cardUpdate } = useBoardProvider();
		const [ordenPositionTaskCards] = useOrdenPositionTaskCardsMutation();
		const [orderTaskCardsOndrag] = useOrderTaskCardsOndragMutation();
		const dispatch = useAppDispatch();
		const { id } = useParams();

		const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
			const { source, destination } = result;

			if (!destination) {
				return;
			}

			const sourceIndex = +source.droppableId;
			const destinationIndex = +destination.droppableId;

			if (sourceIndex === destinationIndex) {
				if (source.index === destination.index) return;
				const items = reorder(listsArray[sourceIndex], source.index, destination.index);
				const idList = listsArray[destinationIndex]._id;

				dispatch(
					listApi.util.updateQueryData('getLists', id!, (draftPosts) => {
						draftPosts.map((list) => {
							if (list._id === idList) {
								list.taskCards = items;
								return list;
							}

							return list;
						});
					})
				);

				// ** reorder list request <== it can improve
				ordenPositionTaskCards({ idList, items, action: 'REODER_POS' });
			} else {
				const result = moveDrag(
					listsArray[sourceIndex],
					listsArray[destinationIndex],
					source,
					destination
				);

				const idListSource = listsArray[sourceIndex]._id;
				const idListDestination = listsArray[destinationIndex]._id;

				dispatch(
					listApi.util.updateQueryData('getLists', id!, (lists) => {
						lists[sourceIndex].taskCards = result[sourceIndex as keyof typeof result];
						lists[destinationIndex].taskCards = result[destinationIndex as keyof typeof result];
					})
				);

				orderTaskCardsOndrag({
					idListSource,
					idListDestination,
					idCard: result.idCard,
					action: 'REODER_DRAG',
				});
			}
		};

		return (
			<div className='board-main absolute inset-0 flex p-4 overflow-y-hidden overflow-x-auto'>
				<DragDropContext onDragEnd={onDragEnd}>
					{listsArray.map((list, index) => (
						<StrictModeDroppable
							key={list._id}
							droppableId={`${index}`}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className='mx-2'>
									<TaskCardList
										key={list._id}
										list={list}
										provided={provided}
										snapshot={snapshot}
										onOpenFormCreateCard={onOpenFormCreateCard}
										setIsShowModalFormCard={setIsShowModalFormCard}
										setIsShowModalFormList={setIsShowModalFormList}
									/>
								</div>
							)}
						</StrictModeDroppable>
					))}
				</DragDropContext>

				<div className='contenedor-list'>
					<Button
						colorCustom='bg-neutral-800'
						className='flex justify-between items-center py-2 px-4 transition-colors active:bg-[#212121]'
						type='button'
						onClick={() => {
							setIsShowModalFormList(true);
							if (!listCurrent._id) return;
							setListCurrent({} as ListTypes);
						}}>
						<span className='text-blue-500'>Add Another List</span>
						<IoAddOutline color='blue' />
					</Button>
				</div>
			</div>
		);
	}
);
