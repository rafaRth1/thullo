import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';
import { LabelActions } from '../../..';

interface Props {
	card: any;
	isDragging: any;
	handleDragging: (dragging: boolean) => void;
	handleEditCard: (id: number) => void;
}

export const Card = ({ card, isDragging, handleDragging, handleEditCard }: Props) => {
	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		event.dataTransfer.setData('text', `${card.id}`);
		handleDragging(true);
	};

	const handleDragEnd = () => {
		handleDragging(false);
	};

	return (
		<div
			className={`card-container rounded-2xl mb-3 z-40 transition-colors relative touch-none select-none ${
				isDragging ? 'border-dashed border-blue-400 border-2 ' : ''
			}`}
			onClick={() => handleEditCard(card)}>
			<div
				className={`card-content bg-white p-2 shadow-xl rounded-2xl cursor-move`}
				draggable
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}>
				{/* /* Section Image */}
				<p className='name-card text-black'>{card.name_card}</p>

				<LabelActions />

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
							<span className='text-xs text-neutral-500 p-1'>1</span>
						</div>

						<div className='comments flex items-center'>
							<IoChatboxSharp className='text-neutral-400' />
							<span className='text-xs text-neutral-500 p-1'>1</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
