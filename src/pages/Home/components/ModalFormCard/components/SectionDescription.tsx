import { useContext } from 'react';
import { LabelElement } from '@components/';
import { FormCardContext } from '@context/';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';

export const SectionDescription = () => {
	const { formState, onInputChange, handleEditDescription } = useContext(FormCardContext);

	return (
		<div className='description-card-content'>
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
					classname='border-solid border-neutral-700 border-2 mx-3'>
					<IoPencilSharp className='text-white' />
				</LabelElement>
			</div>

			<textarea
				className='w-full p-2 mt-3 bg-transparent text-white'
				placeholder='Write a description...'
				name='description'
				value={formState?.description}
				onChange={(e) => onInputChange(e)}
				onBlur={handleEditDescription}
			/>
		</div>
	);
};
