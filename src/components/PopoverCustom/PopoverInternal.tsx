import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { PopoverContext } from './PopoverContext';
import { getCoordsPositionStatic } from '@utils/getCoordsPositionStatic';
import { getModalCoords } from '@utils/getModalCoords';

export const PopoverInternal = ({ children }: { children: ReactElement | ReactElement[] | null }) => {
	const { isMounted, triggerRect, preferredPosition } = useContext(PopoverContext);
	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
		transform: '',
	});
	const mountedStyle = { animation: 'inAnimation 100ms ease-in' };
	const unmountedStyle = { animation: 'outAnimation 110ms ease-in' };
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (element === null) {
			return;
		}

		const rect = element.getBoundingClientRect();
		const valueCoords = getCoordsPositionStatic(triggerRect, rect, preferredPosition);

		if (valueCoords?.top === undefined) {
			return;
		}

		setCoords({ top: valueCoords!.top, left: valueCoords!.left, transform: valueCoords.transform });
	}, []);

	return preferredPosition !== 'static' ? (
		<div
			className='modal-content-internal'
			ref={ref}
			style={{
				...(isMounted ? mountedStyle : unmountedStyle),
				position: 'absolute',
				left: `${coords.left}px`,
				top: `${coords.top}px`,
				zIndex: 70,
				transformOrigin: `${coords.transform}`,
			}}>
			{children}
		</div>
	) : (
		<div
			className='modal-content-internal'
			ref={ref}>
			{children}
		</div>
	);
};
