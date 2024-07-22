import { useDate } from '@hooks/';

export const Attachment = ({ attach, handleDeleteAttachment }: any) => {
	const { day, month, year } = useDate();

	return (
		<div className='body-attachments-card'>
			<div className='body-attachments-card-items items-center flex m-3'>
				{attach.name_img ? (
					<div
						className='image-attachments'
						style={{ width: '80px', height: '53px' }}>
						<img
							src={attach.name_img}
							alt='Imagen Attachments'
							className='rounded-xl h-full w-full'
						/>
					</div>
				) : (
					<div
						className='image-attachments bg-neutral-500 rounded-xl flex items-center justify-center'
						style={{ width: '80px', height: '53px' }}>
						<span>{attach.name.slice(0, 2)}</span>
					</div>
				)}

				<div className='ml-3'>
					<div className='date-add mb-2'>
						<span className='text-xs text-neutral-500 pl-1'>{`Added ${month} ${day},${year}`}</span>

						<p className='text-sm block rounded-xl w-80 p-1 pl-2 text-white'>{attach.name}</p>
					</div>

					<div className='actions-attachments'>
						<button
							type='button'
							className='border-2 py-1 px-3 mr-2 rounded-xl border-neutral-700 text-neutral-500 text-sm'>
							Download
						</button>
						<button
							type='button'
							className='border-2 py-1 px-3 rounded-xl border-neutral-700 text-neutral-500 text-sm'
							onClick={() => handleDeleteAttachment(attach.id)}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
