import { LabelElement } from '../../LabelElement';
import { IoAdd, IoDocumentTextOutline } from 'react-icons/io5';

export const AttachmentsModalCard = () => {
	return (
		<div className='attachments-content'>
			<div className='header-attachments-card flex mt-5'>
				<div className='flex items-center text-neutral-500 text-sm'>
					<IoDocumentTextOutline
						size={17}
						className='mr-3'
					/>
					<span>Attachments</span>
				</div>

				<LabelElement label='Add'>
					<IoAdd className='text-white' />
				</LabelElement>
			</div>

			<div className='body-attachments-card'>
				<div className='body-attachments-card-items flex items-center m-3'>
					<div
						className='image-attachments'
						style={{ width: '80px', height: '53px' }}>
						<img
							src='https://concepto.de/wp-content/uploads/2015/03/paisaje-800x409.jpg'
							alt='Imagen Attachments'
							className='rounded-xl object-cover h-full w-full'
						/>
					</div>

					<div className='ml-3'>
						<div className='date-add'>
							<span className='text-sm text-neutral-500'>Added July 5,2020</span>
							<p>Reasoning by Ranganath Krishnamani</p>
						</div>

						<div className='actions-attachments'>
							<button className='border-2 py-1 px-3 mr-2 rounded-xl border-neutral-400 text-neutral-500'>
								Download
							</button>
							<button className='border-2 py-1 px-3 rounded-xl border-neutral-400 text-neutral-500'>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
