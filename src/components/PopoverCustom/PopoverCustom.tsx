import { useState, ReactElement, useEffect } from 'react';
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

function useDelayUnmount(isMounted: boolean, delayTime: number) {
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (isMounted && !shouldRender) {
			setShouldRender(true);
		} else if (!isMounted && shouldRender) {
			timeoutId = setTimeout(() => setShouldRender(false), delayTime);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isMounted, delayTime, shouldRender]);

	return shouldRender;
}

const PopoverCustom = ({ children, preferredPosition = 'bottom' }: PropsModal) => {
	const [isMounted, setIsMounted] = useState(false);
	const [triggerRect, setTriggerRect] = useState(defaultRect);
	const shouldRenderChild = useDelayUnmount(isMounted, 100);

	const contextValues = {
		isMounted,
		setIsMounted,
		triggerRect,
		setTriggerRect,
		preferredPosition,
		shouldRenderChild,
	};

	return <PopoverContext.Provider value={contextValues}>{children}</PopoverContext.Provider>;
};

PopoverCustom.displayName = 'PopoverCustom.Trigger';

export default PopoverCustom;
