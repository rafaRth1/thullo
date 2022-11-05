import { memo } from 'react';
import { LabelActions } from '../../..';
import { IoAddOutline, IoAttach, IoChatboxSharp } from 'react-icons/io5';

interface Props {
	url_image: string;
	name_card: string;
	description: string;
	attachments: [];
	comments: [];
}

export const Card = memo(({ name_card }: Props) => {
	return (
		<div className='card-container'>
			<div className='card-content p-2 shadow-xl'>
				{/* /* Section Image */}
				<p className='name-card'>{name_card}</p>

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
});
