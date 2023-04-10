import { useState, useEffect } from 'react';
import { LabelElement } from '../..';

interface Props {
	nameLabel: string;
	children?: JSX.Element;
	IconLabel: any;
}

export const LabelPopup = ({ children, nameLabel, IconLabel }: Props) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<>
			<div
				className='bg-neutral-700 rounded p-1 cursor-pointer'
				onClick={() => setIsShow(!isShow)}>
				<LabelElement label={nameLabel}>{<IconLabel className='text-white mr-2' />}</LabelElement>
			</div>

			<div className={`${isShow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>{children}</div>
		</>
	);
};
