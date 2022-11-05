import { LabelElement } from '../../LabelElement';
import { IoPeopleOutline, IoPersonCircleOutline } from 'react-icons/io5';

export const CardColumnTwo = () => {
	return (
		<>
			<div className='flex items-center text-neutral-500 text-sm self-end'>
				<IoPersonCircleOutline
					size={17}
					className='mr-3'
				/>
				<span>Actions</span>
			</div>

			<div className='actions-labels'>
				<div className='mt-2'>
					<LabelElement label='Members'>
						<IoPeopleOutline />
					</LabelElement>
				</div>

				<div className='mt-2'>
					<LabelElement label='Members'>
						<IoPeopleOutline />
					</LabelElement>
				</div>

				<div className='mt-2'>
					<LabelElement label='Members'>
						<IoPeopleOutline />
					</LabelElement>
				</div>
			</div>
		</>
	);
};
