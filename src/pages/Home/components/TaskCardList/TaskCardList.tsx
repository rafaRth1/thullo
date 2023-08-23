import { memo, useCallback } from 'react';
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useAppDispatch, useBoardProvider, useProvider } from '@hooks/';
import { AddElementLabel } from '@components/';
import Popover from '@components/Popover';
import { TaskCard } from '@pages/Home/components/';
import { CardStateProps, ListTypes } from '@interfaces/';
import { deleteListThunk } from '@redux/home/slices/listsSlice';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

interface Props {
	list: ListTypes;
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	setIsShowModalCreateCard?: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	setIsShowModalFormList?: React.Dispatch<React.SetStateAction<boolean>>;
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

export const TaskCardList = memo(
	({
		list,
		provided,
		snapshot,
		setIsShowModalCreateCard,
		setIsShowModalFormCard,
		setIsShowModalFormList,
	}: Props) => {
		const { setListCurrent, setCardUpdate } = useProvider();
		const { taskCards } = useBoardProvider();
		const dispatch = useAppDispatch();

		const handleEditList = () => {
			setIsShowModalFormList!(true);
			setListCurrent(list);
		};

		const handlerOpenFormEditCard = useCallback((card: CardStateProps) => {
			setIsShowModalFormCard(true);
			setCardUpdate(card);
		}, []);

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

				{taskCards.map((taskCard, index) => {
					if (taskCard.list === list._id) {
						return (
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
						);
					} else {
						return;
					}
				})}

				{provided.placeholder}

				<div className='mt-2'>
					<AddElementLabel
						text='Add Another Card'
						handleDispatch={() => {
							setIsShowModalCreateCard!(true), setCardUpdate(card), setListCurrent(list);
						}}
					/>
				</div>
			</div>
		);
	}
);
