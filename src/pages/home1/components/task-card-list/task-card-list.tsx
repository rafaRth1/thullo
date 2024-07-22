import { memo, useCallback } from 'react';
import { Draggable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useBoardProvider } from '@hooks/';
import { TaskCard } from '@pages/home/components';
import { TaskCardTypes, ListTypes } from '@interfaces/';
import { IoAddOutline, IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import './task-card-list.css';

interface Props {
	list: ListTypes;
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	onOpenFormEditCard: () => void;
	onOpenFormCard: () => void;
	onOpenFormList: () => void;
}

export const TaskCardList = memo(({ list, provided, onOpenFormEditCard, onOpenFormCard, onOpenFormList }: Props) => {
	const { setListCurrent, setCardUpdate, lists, setLists } = useBoardProvider();

	const handlerOpenFormEditCard = useCallback((card: TaskCardTypes) => {
		setCardUpdate(card);
		onOpenFormEditCard();
	}, []);

	const handleEditList = useCallback(() => {
		setListCurrent(list);
		onOpenFormList();
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
		<div className='flex flex-col w-100 min-w-[250px] max-w-[250px] max-h-full'>
			<div className='content-list mb-5'>
				<div
					style={{
						backgroundImage: `linear-gradient(to bottom, ${list.color_header.primary_color}, ${list.color_header.secondary_color})`,
					}}
					className={`header-list flex justify-between items-center py-2 px-4 rounded-xl text-sm h-10`}>
					<p className='flex-1 text-white'>{list.name}</p>

					<Popover
						placement='bottom'
						classNames={{ content: 'bg-[#18181a]' }}>
						<PopoverTrigger>
							<div>
								<IoEllipsisHorizontalSharp className='text-white cursor-pointer' />
							</div>
						</PopoverTrigger>
						<PopoverContent>
							<div className='flex flex-col bottom-auto right-auto w-32 rounded transition-opacity'>
								<Button
									className='text-yellow-500 bg-transparent'
									onClick={() => {
										handleEditList();
									}}>
									Renombrar
								</Button>

								<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>

								<Button
									className='text-red-500 bg-transparent'
									// onClick={handleDeleteList}
									onClick={() => console.log('handleDeleteList')}>
									Eliminar lista
								</Button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			<div className='content-cards flex flex-col overflow-y-auto pr-1'>
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
			</div>

			{provided.placeholder}

			<Button
				className='flex justify-between items-center py-2 px-4 mt-2 bg-neutral-800'
				type='button'
				onPress={onOpenFormCard}
				onClick={() => setListCurrent(list)}>
				<span className='text-blue-500'>Agregar tarjeta</span>
				<IoAddOutline color='blue' />
			</Button>
		</div>
	);
});
