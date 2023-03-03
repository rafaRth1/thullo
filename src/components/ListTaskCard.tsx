import { useState, useEffect } from 'react';
import { useProvider } from '../hooks';
import { StrictModeDroppable } from './StrictModeDroppable';
import { AddElementLabel, ModalFormCreateCard, ModalRename, TaskCard } from './';
import { CardUpdateProps } from './ListCard/types/CardUpdateProps';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

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

export const ListTaskCard = ({ list, indexList }: any) => {
	const [taskCards, setTaskCards] = useState<any[]>(list.taskCards);
	const [isShowModalCard, setIsShowModalCard] = useState(false);
	const [modalRename, setModalRename] = useState(false);
	const [showMenuList, setShowMenuList] = useState(false);
	const { lists, setOverflow } = useProvider();
	const [cardUpdate, setCardUpdate] = useState(card);

	const handleEditCard = (card: any) => {
		setIsShowModalCard(true);
		setCardUpdate(card);
	};

	const handleEditList = () => {
		setModalRename(true);
	};

	useEffect(() => {
		setTaskCards(list.taskCards);
	}, [lists]);

	return (
		<StrictModeDroppable
			key={list._id}
			droppableId={`${indexList}`}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					className='contenedor-list relative'
					{...provided.droppableProps}>
					<div className='content-list max-h-full flex flex-col'>
						<div className='header-list mb-5 flex justify-between items-center cursor-pointer'>
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
										onClick={() => console.log('handleEditList')}>
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

						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='cards flex-1'>
							{taskCards.map((taskCard: any, index: any) => (
								<TaskCard
									key={taskCard._id}
									taskCard={taskCard}
									index={index}
									handleEditCard={handleEditCard}
								/>
							))}

							{provided.placeholder}

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
					</div>
				</div>
			)}
		</StrictModeDroppable>
	);
};
