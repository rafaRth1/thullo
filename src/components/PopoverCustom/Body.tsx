import { useState, useContext, ReactElement, useLayoutEffect } from 'react';
import { PopoverContext } from './PopoverContext';
import { PopoverInternal } from './PopoverInternal';
import { createPortal } from 'react-dom';

interface Props {
	children: ReactElement | ReactElement[];
}

function useDelayUnmount(isMounted: boolean, delayTime: number) {
	const [shouldRender, setShouldRender] = useState(false);

	useLayoutEffect(() => {
		let timeoutId: any;

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

function Body({ children }: Props) {
	const { isMounted } = useContext(PopoverContext);
	const shouldRenderChild = useDelayUnmount(isMounted, 100);

	// return shouldRenderChild ? (
	// 	<div tabIndex={-1}>
	// 		<PopoverInternal>{children}</PopoverInternal>
	// 	</div>
	// ) : (
	// 	<></>
	// );

	return createPortal(
		shouldRenderChild && (
			<div tabIndex={-1}>
				<PopoverInternal>{children}</PopoverInternal>
			</div>
		),
		document.body
	);
}

Body.displayName = 'PopoverCustom.Body';

export default Body;
