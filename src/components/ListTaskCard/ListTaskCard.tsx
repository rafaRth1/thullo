import clientAxios from '../../config/clientAxios';
import { Draggable, Container } from '@sntxx/react-smooth-dnd';
import { useState } from 'react';
import { useProvider } from '../../hooks';
import { AddElementLabel, ModalRename, TaskCard } from '..';
import { applyDrag } from '../../utils';
import { CardStateProps } from './ListTaskCardTypes';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

interface PropsListTaskCard {
	list: {
		_id: string;
		name: string;
		project: string;
		taskCards: CardStateProps[];
	};
}

let card: CardStateProps = {
	_id: '',
	nameCard: '',
	description: '',
	imgUlr: '',
	members: [],
	attachments: [],
	comments: [],
	labels: [],
};

export const ListTaskCard = ({ list }: PropsListTaskCard): JSX.Element => {
	const [showMenuList, setShowMenuList] = useState(false);
	const {
		lists,
		setLists,
		setListCurrent,
		isShowModalCard,
		setIsShowModalCard,
		setCardUpdate,
		setModalRename,
	} = useProvider();

	const handleEditCard = (card: CardStateProps) => {
		setIsShowModalCard(true);
		setCardUpdate(card);
	};

	const handleEditList = () => {
		setModalRename(true);
		setListCurrent(list._id);
	};

	const onCardDrop = async (
		columnId: string,
		dropResult: { addedIndex: number | null; payload?: CardStateProps; removedIndex: number | null }
	) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			const project = { ...lists };
			const [column] = project.lists.filter((list: { _id: string }) => list._id === columnId);
			const columnIndex = project.lists.indexOf(column);

			const newColumn = { ...column };
			newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);
			project.lists.splice(columnIndex, 1, newColumn);
			setLists(project);

			if (dropResult.removedIndex === dropResult.addedIndex) {
				return;
			} else {
				try {
					await clientAxios.put(`/list/update-list/${column._id}`, {
						taskCards: newColumn.taskCards,
						_idTaskCard: dropResult.payload?._id,
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const getCardPayload = (columnId: string, index: number) => {
		return lists.lists.filter((p: { _id: string }) => p._id === columnId)[0].taskCards[index];
	};

	return (
		<>
			<Draggable>
				<div className='contenedor-list relative'>
					<div className='content-list max-h-full'>
						<div className='header-list mb-5 px-2 flex justify-between  items-center cursor-pointer'>
							{/* <span className='column-drag-handle'>&#x2630;</span> */}
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
										onClick={() => handleEditList()}>
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
						onDrop={(e) => onCardDrop(list._id, e)}
						getChildPayload={(index: any) => getCardPayload(list._id, index)}
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
								handleEditCard={handleEditCard}
							/>
						))}
					</Container>

					<div className='mt-2'>
						<AddElementLabel
							text='Add Another Card'
							handleDispatch={() => {
								setIsShowModalCard(!isShowModalCard), setCardUpdate(card), setListCurrent(list._id);
							}}
						/>
					</div>
				</div>
			</Draggable>
		</>
	);
};
