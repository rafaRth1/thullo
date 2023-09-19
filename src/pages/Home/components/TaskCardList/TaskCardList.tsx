import { memo, useCallback } from 'react';
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useBoardProvider } from '@hooks/';
import { Button } from '@components/';
import Popover from '@components/Popover';
import { TaskCard } from '@pages/Home/components/';
import { TaskCardTypes, ListTypes } from '@interfaces/';
import { IoAddOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';

interface Props {
	list: ListTypes;
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	onOpenFormCreateCard: () => void;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskCardList = memo(
	({ list, provided, onOpenFormCreateCard, setIsShowModalFormCard, setIsShowModalFormList }: Props) => {
		const { setListCurrent, setCardUpdate, lists, setLists } = useBoardProvider();

		const handlerOpenFormEditCard = useCallback((card: TaskCardTypes) => {
			setCardUpdate(card);
			setIsShowModalFormCard(true);
		}, []);

		const handleEditList = useCallback(() => {
			setListCurrent(list);
			setIsShowModalFormList(true);
		}, []);

		const handleDeleteList = async () => {
			try {
				// const { data } = await deleteListService(list._id);
				// const listsUpdate = lists.filter((listState) => listState._id !== list._id);
				// setLists(listsUpdate);
				// FIX: manage  return value removed
			} catch (error) {
				console.log(error);
			}
		};

		const getItemStyle = (isDragging: any, draggableStyle: any) => ({
			userSelect: 'none',
			...draggableStyle,
		});

		return (
			<div className='contenedor-list'>
				<div className='content-list mb-5'>
					<div className='header-list px-2 flex justify-between items-center'>
						<div className='flex-1 text-white'>{list.name}</div>

						<Popover preferredPosition='bottom-center'>
							<Popover.PopoverContent>
								{(onClose, onOpenClose) => (
									<>
										<Popover.Trigger>
											<span>
												<IoEllipsisHorizontalSharp className='text-white cursor-pointer' />
											</span>
										</Popover.Trigger>

										<Popover.Body>
											<div
												className={`flex flex-col bottom-auto right-auto w-32 bg-neutral-700 rounded transition-opacity `}>
												<span
													className='text-yellow-500 hover:text-yellow-600 cursor-pointer text-md p-2'
													onClick={() => {
														handleEditList();
														onOpenClose();
													}}
													// onClick={() => console.log('handleEditList')}
												>
													Rename
												</span>

												<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>

												<span
													className='text-red-500 hover:text-red-600 cursor-pointer text-md p-2'
													// onClick={handleDeleteList}
													onClick={() => console.log('handleDeleteList')}>
													Delete this list
												</span>
											</div>
										</Popover.Body>
									</>
								)}
							</Popover.PopoverContent>
						</Popover>
					</div>
				</div>

				{list.taskCards.map((taskCard, index) => (
					<Draggable
						key={taskCard._id}
						draggableId={taskCard._id!}
						index={index}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
								<TaskCard
									key={taskCard._id}
									taskCard={taskCard}
									handlerOpenFormEditCard={handlerOpenFormEditCard}
									snapshot={snapshot}
								/>
							</div>
						)}
					</Draggable>
				))}

				{provided.placeholder}

				<Button
					colorCustom='bg-neutral-800'
					className='flex justify-between items-center py-2 px-4 mt-2 active:bg-[#212121]'
					type='button'
					onClick={() => {
						onOpenFormCreateCard(), setListCurrent(list);
					}}>
					<span className='text-blue-500'>Add Another Card</span>
					<IoAddOutline color='blue' />
				</Button>
			</div>
		);
	}
);
