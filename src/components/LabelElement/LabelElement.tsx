import { memo } from 'react';

interface Props {
	children?: JSX.Element | JSX.Element[];
	label: string;
	classname?: string;
	handleFunction?: () => void;
}

export const LabelElement = memo(({ children, label, classname, handleFunction }: Props): JSX.Element => {
	return (
		<div
			onClick={handleFunction}
			className={`all-board inline-flex items-center cursor-pointer rounded-md py-1 px-3 text-xs h-6 ${classname} `}>
			{children}
			<span className='ml-1 text-neutral-200 capitalize'>{label}</span>
		</div>
	);
});
