import { LabelElement } from '../../LabelElement';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';

export const InputDescriptionCard = () => {
	return (
		<div className='input-description-card'>
			<div className='header-description flex mt-5'>
				<div className='flex items-center text-neutral-500 text-sm'>
					<IoDocumentTextOutline
						size={17}
						className='mr-3'
					/>
					<span>Description</span>
				</div>

				<LabelElement label='Edit'>
					<IoPencilSharp className='text-white' />
				</LabelElement>
			</div>

			<textarea
				className='w-full p-2 mt-3 bg-transparent'
				placeholder='Write a description...'></textarea>
		</div>
	);
};
