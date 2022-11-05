import { memo } from 'react';

interface Props {
	children?: JSX.Element;
	label: string;
	classname?: string;
}

export const LabelElement = memo(({ children, label, classname }: Props) => {
	return (
		<div
			className={`all-board inline-flex items-center rounded-lg py-1 px-3 mx-3 text-xs cursor-pointer h-6 ${classname} `}>
			{children}
			<span className={`ml-1 `}>{label}</span>
		</div>
	);
});
