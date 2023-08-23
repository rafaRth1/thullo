import React, { memo } from 'react';
import { AddElementLabel } from '@components/';
import { moveDrag, reorder } from '@utils/';
import { useAppDispatch } from '@hooks/useRedux';
import { StrictModeDroppable, TaskCardList } from '@pages/Home/components';
import { updateListDrag } from '@redux/home/slices/listsSlice';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useBoardProvider } from '@hooks/useBoardProvider';

interface Props {
	setIsShowModalCreateCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Board = memo(
	({ setIsShowModalCreateCard, setIsShowModalFormCard, setIsShowModalFormList }: Props) => {
		const { lists } = useBoardProvider();
		const dispatch = useAppDispatch();

		const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
			const { source, destination } = result;

			if (!destination) {
				return;
			}

			const sourceIndex = +source.droppableId;
			const destinationIndex = +destination.droppableId;

			if (sourceIndex === destinationIndex) {
				if (source.index === destination.index) return;
				const items = reorder(lists[sourceIndex], source.index, destination.index);
				console.log(items);
				// dispatch(updateListDrag({ type: 'REORDER', items, sourceIndex }));
			} else {
				const result = moveDrag(lists[sourceIndex], lists[destinationIndex], source, destination);
				console.log(result);
				// dispatch(updateListDrag({ type: 'MOVE', items: result, sourceIndex, destinationIndex }));
			}
		};

		return (
			<div className='board-main absolute inset-0 flex p-2'>
				<DragDropContext onDragEnd={onDragEnd}>
					{lists.map((list, index) => (
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
										setIsShowModalCreateCard={setIsShowModalCreateCard}
										setIsShowModalFormCard={setIsShowModalFormCard}
										setIsShowModalFormList={setIsShowModalFormList}
									/>
								</div>
							)}
						</StrictModeDroppable>
					))}
				</DragDropContext>

				<div className='contenedor-list'>
					<AddElementLabel
						text='Add Another List'
						handleDispatch={() => setIsShowModalFormList(true)}
					/>
				</div>
			</div>
		);
	}
);
