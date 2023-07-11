import { ReactElement, useContext, useRef, cloneElement } from 'react';
import { PopoverContext } from './context/PopoverContext';

interface Props {
	children: ReactElement;
}

export const Trigger = ({ children }: Props) => {
	const { setIsShow, setTriggerRect } = useContext(PopoverContext);
	const ref = useRef<HTMLDivElement>(null);

	const onClick = () => {
		const element = ref.current;

		if (element === null) {
			return;
		}

		const rect = element.getBoundingClientRect();

		setTriggerRect(rect);
		setIsShow((isShow) => !isShow);
	};

	const childrenTriggerModal = cloneElement(children, {
		onClick,
		ref,
	});

	// console.log(childrenTriggerModal);

	return <>{childrenTriggerModal}</>;
};
