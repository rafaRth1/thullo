import { ReactElement, useMemo, useState } from 'react';
import { ModalContext } from './context/ModalContext';
import { createPortal } from 'react-dom';
import './Modal.css';

interface Props {
	children: ReactElement | ReactElement[];
}

export const Modal = ({ children }: Props) => {
	const [isShow, setIsShow] = useState(false);

	const contextValues = useMemo(
		() => ({
			isShow,
			setIsShow,
		}),
		[isShow, setIsShow]
	);

	return <ModalContext.Provider value={contextValues}>{children}</ModalContext.Provider>;
};
