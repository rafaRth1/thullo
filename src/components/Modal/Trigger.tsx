import { ReactElement, useContext } from 'react';
import { ModalContext } from './context/ModalContext';

interface Props {
	children: ReactElement;
	className?: string;
}

export const Trigger = ({ children, className }: Props) => {
	const { isShow, setIsShow } = useContext(ModalContext);

	console.log(isShow);

	return (
		<button
			className={`trigger-button ${className}`}
			onClick={() => setIsShow(!isShow)}>
			{children}
		</button>
	);
};
