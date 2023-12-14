import { ReactElement, useContext, useLayoutEffect, useRef, useState } from 'react';
import { PopoverContext } from './PopoverContext';
// import { getModalCoords } from '../../utils/getModalCoords';

interface Props {
	children: ReactElement | ReactElement[] | null;
}

export const ContentInternal = ({ children }: Props) => {
	const { triggerRect, preferredPosition } = useContext(PopoverContext);
	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
	});

	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const element = ref.current;

		if (element === null) {
			return;
		}

		const rect = element.getBoundingClientRect();
		// const valueCoords = getModalCoords(triggerRect, rect, preferredPosition);

		// if (valueCoords?.top === undefined) {
		// 	return;
		// }

		// setCoords({ top: valueCoords!.top, left: valueCoords!.left });
	}, []);

	return preferredPosition !== 'static' ? (
		<div
			className='modal-content-internal'
			ref={ref}
			style={{
				position: 'absolute',
				left: `${coords.left}px`,
				top: `${coords.top}px`,
				zIndex: 70,
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
