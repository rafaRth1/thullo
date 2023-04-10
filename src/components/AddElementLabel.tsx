import { memo } from 'react';
import { IoAddOutline } from 'react-icons/io5';

interface Props {
	text: string;
	handleDispatch: () => any;
}

export const AddElementLabel = memo(({ text, handleDispatch }: Props) => {
	return (
		<div
			className='add-element-label-content flex items-center w-auto bg-neutral-800 py-1 px-4 rounded-xl cursor-pointer pointer-events-auto '
			onClick={handleDispatch}>
			<span className='flex-1 text-blue-500'>{text}</span>
			<IoAddOutline color='blue' />
		</div>
	);
});
