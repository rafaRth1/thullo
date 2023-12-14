import { useState, ReactElement, memo } from 'react';
import { PopoverContext, Position, Rect } from './PopoverContext';

interface PropsModal {
	children: ReactElement | ReactElement[];
	preferredPosition: Position;
}

const defaultRect: Rect = {
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	height: 0,
	bottom: 0,
	x: 0,
	y: 0,
};

const Popover = ({ children, preferredPosition = 'bottom' }: PropsModal) => {
	const [isMounted, setIsMounted] = useState(false);
	const [triggerRect, setTriggerRect] = useState(defaultRect);

	const contextValues = {
		isMounted,
		setIsMounted,
		triggerRect,
		setTriggerRect,
		preferredPosition,
	};

	return <PopoverContext.Provider value={contextValues}>{children}</PopoverContext.Provider>;
};

export default Popover;
