import { Draggable } from '@sntxx/react-smooth-dnd';
import { ImageProfile } from '../ImageProfile/ImageProfile';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';
import { OverlayImage } from '../OverlayImage/OverlayImage';

interface Props {
	taskCard: CardStateProps;
	handleOpenFormEditCard: (card: CardStateProps) => void;
}

export const TaskCard = ({ taskCard, handleOpenFormEditCard }: Props) => {
	return (
		<Draggable>
			<div
				className='card-container rounded-2xl z-0 transition-colors relative touch-none select-none mb-2'
				onClick={() => {
					handleOpenFormEditCard(taskCard);
				}}>
				<div className='card-content bg-neutral-800 p-2 shadow-xl rounded-2xl cursor-grab'>
					{taskCard.imgUlr && (
						<div className='card-image relative h-[130px] mb-2'>
							{taskCard.imgUlr && (
								<OverlayImage
									src={taskCard.imgUlr}
									alt='Card Image'
									className='rounded-lg w-full h-full object-cover'
								/>
							)}
						</div>
					)}

					<p className='name-card text-white font-medium'>{taskCard.nameCard}</p>

					<div className='labels my-2'>
						{taskCard.labels.map((label) => (
							<div
								key={label._id}
								className='inline-flex items-center cursor-pointer rounded-lg py-1 px-3 m-1 ml-0 text-xs'
								style={{ background: label.colorLight }}>
								<span
									style={{ color: label.color }}
									className='capitalize font-medium'>
									{label.nameLabel}
								</span>
							</div>
						))}
					</div>

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
											className='mr-2'
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
