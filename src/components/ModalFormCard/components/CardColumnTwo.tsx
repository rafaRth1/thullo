import { useContext } from 'react';
import { FormCardContext } from '../../../context';
import { SectionCovers, SectionLabels } from './';
import { SectionMembers } from './SectionMembers/SectionMembers';
import { IoPersonCircleOutline } from 'react-icons/io5';

export const CardColumnTwo = () => {
	const { formState, handleDeleteCard } = useContext(FormCardContext);

	return (
		<div className='card-column-two flex-1'>
			<div className='flex items-center text-neutral-500 text-sm self-end'>
				<IoPersonCircleOutline
					size={17}
					className='mr-3'
				/>
				<span>Actions</span>
			</div>

			<div className='actions-labels'>
				<SectionLabels />
				<SectionCovers />
				<SectionMembers />

				{formState?._id && (
					<div
						className='bg-red-600 hover:bg-red-700 transition-colors rounded p-1 text-center cursor-pointer mt-2'
						onClick={handleDeleteCard}>
						<span className='text-white text-sm'>Delete Card</span>
					</div>
				)}
			</div>
		</div>
	);
};
