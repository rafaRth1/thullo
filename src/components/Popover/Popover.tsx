import { useState, ReactElement } from 'react';
import { PopoverContext } from './context/PopoverContext';
import { Position } from '../../interfaces';

interface PropsModal {
	children: ReactElement | ReactElement[];
	preferredPosition: Position;
}

const defaultRect = {
	left: 0,
	top: 0,
	width: 0,
	height: 0,
};

export const Popover = ({ children, preferredPosition = 'bottom-center' }: PropsModal) => {
	const [isShow, setIsShow] = useState(false);
	const [triggerRect, setTriggerRect] = useState(defaultRect);

	const contextValues = {
		isShow,
		setIsShow,
		triggerRect,
		setTriggerRect,
		preferredPosition,
	};

	return <PopoverContext.Provider value={contextValues}>{children}</PopoverContext.Provider>;
};
