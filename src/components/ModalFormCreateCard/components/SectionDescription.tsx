import { useState } from 'react';
import { LabelElement } from '../..';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';

export const SectionDescription = ({ formState, onInputChange }: any) => {
	const [isActiveDesc, setIsActiveDesc] = useState(true);

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

				<LabelElement
					label='Edit'
					handleFunction={() => setIsActiveDesc(!isActiveDesc)}
					classname='border-solid border-neutral-700 border-2'>
					<IoPencilSharp className='text-white' />
				</LabelElement>
			</div>

			<textarea
				className='w-full p-2 mt-3 bg-transparent text-white'
				placeholder='Write a description...'
				name='description'
				value={formState?.description}
				onChange={onInputChange}
				disabled={isActiveDesc}></textarea>
		</div>
	);
};
