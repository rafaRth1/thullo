import { Draggable, Container } from '@sntxx/react-smooth-dnd';
import { useListTaskCard, useProvider } from '../../hooks';
import { AddElementLabel, TaskCard } from '..';
import Popover from '../Popover';
import { CardStateProps } from '../../interfaces';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

interface PropsTaskcardList {
	list: {
		_id: string;
		name: string;
		project: string;
		taskCards: CardStateProps[];
	};
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

export const TaskCardList = ({ list }: PropsTaskcardList) => {
	const { setListCurrent, setIsShowModalFormCard, setCardUpdate } = useProvider();
	const { handleEditCard, handleEditList, getCardPayload, onCardDrop } = useListTaskCard(list);

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
											onClick={() => handleEditList()}>
											Rename
										</span>

										<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>

										<span
											className='text-red-500 hover:text-red-600 cursor-pointer text-md p-2'
											onClick={() => console.log('handleDeleteList')}>
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

						<div className='mt-2'>
							<AddElementLabel
								text='Add Another Card'
								handleDispatch={() => {
									setIsShowModalFormCard(true), setCardUpdate(card), setListCurrent(list._id);
								}}
							/>
						</div>
					</Container>
				</div>
			</Draggable>
		</>
	);
};
