import { Draggable } from 'react-beautiful-dnd';
import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';

interface Props {
	taskCard: any;
	index: number;
	handleEditCard: any;
}

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	...draggableStyle,
});

export const TaskCard = ({ taskCard, index, handleEditCard }: Props) => {
	return (
		<Draggable
			draggableId={taskCard._id}
			index={index}>
			{(provided: any, snapshot: any) => (
				<div
					// border-dashed border-blue-400 border-4
					className={`card-container rounded-2xl mb-3 z-0 transition-colors relative touch-none select-none`}
					onClick={() => {
						handleEditCard(taskCard);
					}}>
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
						className='card-content  bg-neutral-800 p-2 shadow-xl rounded-2xl cursor-move'>
						<div className='card-image'>
							{!!taskCard.imgUlr ? (
								<img
									src={taskCard.imgUlr}
									alt='Card Image'
									className='rounded-lg w-full object-cover mb-2'
									style={{ height: '130px' }}
								/>
							) : null}
						</div>

						<p className='name-card text-white'>{taskCard.nameCard}</p>

						<div className='all-board inline-flex bg-green-300 items-center rounded-lg py-1 px-3 mt-1 text-xs cursor-pointer h-6'>
							<span className='text-green-900'>Concept</span>
						</div>

						{taskCard.labels.map((label: any, index: number) => (
							<div
								key={index}
								className={`all-board inline-flex items-center rounded-lg py-1 px-3 mt-1 mx-2 text-xs cursor-pointer h-6`}
								style={{ background: label.palet.color_light }}>
								<span style={{ color: label.palet.color }}>{label.nameLabel}</span>
							</div>
						))}

						<div className='footer-card flex items-center justify-between mt-3'>
							<div className='users-access'>
								<div className='user-image-add'>
									<span className='bg-blue-500 w-9 h-9 object-cover rounded-md text-3xl inline-flex items-center justify-center cursor-pointer'>
										<IoAddOutline
											color='white'
											size={20}
										/>
									</span>
								</div>
							</div>

							<div className='archives flex'>
								<div className='attachments flex items-center mr-4'>
									<IoAttach className='text-neutral-500' />
									<span className='text-xs text-neutral-500 p-1'>{taskCard.attachments.length}</span>
								</div>

								<div className='comments flex items-center'>
									<IoChatboxSharp className='text-neutral-400' />
									<span className='text-xs text-neutral-500 p-1'>{taskCard.comments.length}</span>
								</div>
							</div>
						</div>

						{/* <button
								type='button'
								onClick={() => {
									const newState = [...lists];
									newState[ind].cards.splice(index, 1);
									setLists(newState);
								}}>
								delete
							</button> */}
					</div>
				</div>
			)}
		</Draggable>
	);
};
