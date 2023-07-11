import { useContext } from 'react';
import { FormCardContext } from '../../../context';
import { SectionComments, SectionAttachment, SectionDescription } from './';

export const CardColumnOne = () => {
	const { formState, onInputChange, handleEditNameCard } = useContext(FormCardContext);

	return (
		<div className='card-column-one mr-3'>
			<div className='mb-5 flex items-center'>
				<input
					type='text'
					placeholder='Name card example'
					name='nameCard'
					value={formState?.nameCard}
					onChange={(e) => onInputChange(e)}
					onBlur={handleEditNameCard}
					className='bg-transparent focus-visible:outline-0 flex-1 w-full text-white'
				/>
			</div>

			<p className='text-sm text-neutral-300'>
				in list In
				<span className='ml-1 text-white'>Progress</span>
			</p>

			<SectionDescription />
			<SectionAttachment />

			{formState?._id ? <SectionComments /> : null}
		</div>
	);
};
