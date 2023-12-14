import { ReactElement, useContext, useLayoutEffect, useRef, useState } from 'react';
import { PopoverContext } from './PopoverContext';
import { ContentInternal } from './ContentInternal';
import { createPortal } from 'react-dom';

interface Props {
	children: ReactElement | ReactElement[] | null;
	from?: Keyframe;
	to?: Keyframe;
	options?: number | KeyframeAnimationOptions;
	unMountAnimation?: PropertyIndexedKeyframes;
}

const Body = ({
	children,
	from = { opacity: '0' },
	to = { opacity: '1' },
	options = { duration: 150, fill: 'forwards' },
	unMountAnimation,
}: Props) => {
	const { isMounted, setIsMounted } = useContext(PopoverContext);
	const [removeState, setRemove] = useState(!isMounted);
	const elementRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const childElement = elementRef.current;

		if (isMounted) {
			setRemove(false);
			if (!childElement) return;

			childElement.animate([from, to], options);
		} else {
			if (!childElement) return;
			const animation = childElement.animate(unMountAnimation || [to, from], options);
			animation.onfinish = () => {
				setRemove(true);
			};
		}
	}, [isMounted, removeState]);

	return createPortal(
		!removeState && (
			<div
				tabIndex={-1}
				ref={elementRef}>
				<div
					className='fixed inset-0 w-screen h-screen'
					onClick={() => setIsMounted(false)}
					// style={{ backgroundColor: 'hsl(0 0% 0%/.5)' }}
				/>

				<ContentInternal>{children}</ContentInternal>
			</div>
		),
		document.body
	);
};

Body.displayName = 'Popover.Body';

export default Body;
