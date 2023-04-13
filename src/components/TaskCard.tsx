import { Draggable } from '@sntxx/react-smooth-dnd';
import { ImageProfile } from './ImageProfile/ImageProfile';
import { CardStateProps } from './ListTaskCard/ListTaskCardTypes';
import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';

interface Props {
	taskCard: CardStateProps;
	handleEditCard: (card: CardStateProps) => void;
}

export const TaskCard = ({ taskCard, handleEditCard }: Props) => {
	return (
		<Draggable>
			<div
				className={`card-container rounded-2xl z-0 transition-colors relative touch-none select-none`}
				onClick={() => {
					handleEditCard(taskCard);
				}}>
				<div className='card-content bg-neutral-800 p-2 shadow-xl rounded-2xl cursor-grab'>
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

					{taskCard.labels.map((label) => (
						<div
							key={label._id}
							className={`all-board inline-flex items-center rounded-lg py-1 px-3 mt-1 mx-2 text-xs cursor-pointer h-6`}
							style={{ background: label.color_light }}>
							<span
								style={{ color: label.color }}
								className='capitalize'>
								{label.nameLabel}
							</span>
						</div>
					))}

					<div className='footer-card flex items-center justify-between mt-3'>
						<div className='users-access'>
							<div className='user-image-add flex'>
								{taskCard.members.map((member, index) => (
									<div
										className='user-access'
										key={index}>
										<ImageProfile
											name={member.name}
											color={member.colorImg}
										/>
									</div>
								))}

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
				</div>
			</div>
		</Draggable>
	);
};
