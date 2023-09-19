import { ReactElement, useContext, useRef, cloneElement, useMemo, isValidElement, Children } from 'react';
import { PopoverContext } from './PopoverContext';

interface Props {
	children: ReactElement;
}

export const Trigger = ({ children }: Props) => {
	const { setIsShow, setTriggerRect } = useContext(PopoverContext);
	const ref = useRef<HTMLDivElement>(null);
	const childrenRef = useRef(children);

	const onClick = () => {
		const element = ref.current;

		if (element === null) {
			return;
		}

		const rect = element.getBoundingClientRect();

		setTriggerRect(rect);
		setIsShow((isShow) => !isShow);
	};

	const child = useMemo(() => {
		return Children.only(children);
	}, [children]);

	const childrenTriggerModal = cloneElement(child, {
		onClick,
		ref,
	});

	return childrenTriggerModal;
};

Trigger.displayName = 'Popover.Trigger';
