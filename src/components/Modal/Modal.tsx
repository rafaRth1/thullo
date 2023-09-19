import { memo, useRef, useState, useLayoutEffect, useEffect, Children, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { ModalProvider } from './ModalProvider';

interface Props {
	show: boolean;
	onOpenChange: () => void;
	children: React.ReactNode | React.ReactNode[];
	from?: Keyframe;
	to?: Keyframe;
	unMountAnimation?: PropertyIndexedKeyframes;
	options?: number | KeyframeAnimationOptions;
}

export const Modal = ({
	show,
	onOpenChange,
	children,
	from = { opacity: 0 },
	to = { opacity: 1 },
	unMountAnimation,
	options = { duration: 150, fill: 'forwards' },
}: Props) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const [removeState, setRemove] = useState(!show);

	useLayoutEffect(() => {
		const childElement = elementRef.current;

		if (show) {
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
	}, [show, removeState]);

	return createPortal(
		!removeState && (
			<ModalProvider
				open={show}
				onOpenChange={onOpenChange}>
				<div
					tabIndex={-1}
					ref={elementRef}>
					{/* <div className='flex justify-center items-center fixed inset-0 w-screen h-[100vh] transition-opacity z-50'> */}
					<div className='flex justify-center items-center fixed inset-0 w-screen transition-opacity z-50'>
						<section className='bg-neutral-700 rounded-lg relative z-50'>{children}</section>
					</div>
				</div>
			</ModalProvider>
		),
		document.body
	);
};

export default Modal;
