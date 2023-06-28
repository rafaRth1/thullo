import { useState, useRef } from 'react';
import { Draggable, Container } from '@sntxx/react-smooth-dnd';
import { useListTaskCard, useProvider } from '../../hooks';
import { AddElementLabel, Modal, TaskCard } from '..';
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
	const [showMenuList, setShowMenuList] = useState(false);
	const { setListCurrent, isShowModalCard, setIsShowModalCard, setCardUpdate } = useProvider();
	const { handleEditCard, handleEditList, getCardPayload, onCardDrop } = useListTaskCard(list);
	const refMenuList = useRef<HTMLElement>(null);
	const left = refMenuList.current?.getBoundingClientRect().left;
	const top = refMenuList.current?.getBoundingClientRect().top;

	return (
		<>
			<Draggable>
				<div className='contenedor-list'>
					<div className='content-list mb-5'>
						<div className='header-list px-2 flex justify-between items-center'>
							{/* <span className='column-drag-handle'>&#x2630;</span> */}
							<span className='flex-1 text-white'>{list.name}</span>

							<div
								className='relative'
								ref={refMenuList as React.RefObject<HTMLDivElement>}>
								<span>
									<IoEllipsisHorizontalSharp
										className='text-white cursor-pointer'
										onClick={() => setShowMenuList(!showMenuList)}
									/>
								</span>

								<Modal>
									{showMenuList ? (
										<div
											className={`flex flex-col fixed left-3 top-3 bottom-auto right-auto z-40 w-32 bg-neutral-700 rounded transition-opacity ${
												showMenuList
													? 'opacity-100 pointer-events-auto'
													: 'opacity-0 pointer-events-none'
											}`}
											style={{
												transform: `translate(${left}px, ${top}px)`,
											}}>
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
									) : null}
								</Modal>
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

						<div className='mt-2'>
							<AddElementLabel
								text='Add Another Card'
								handleDispatch={() => {
									setIsShowModalCard(!isShowModalCard),
										setCardUpdate(card),
										setListCurrent(list._id);
								}}
							/>
						</div>
					</Container>
				</div>
			</Draggable>
		</>
	);
};
