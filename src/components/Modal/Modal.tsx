import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface Props {
	isShow: boolean;
	setIsShow?: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactElement;
}

export const Modal = ({ isShow, children }: Props) => {
	if (!isShow) {
		return <></>;
	}

	return createPortal(children, document.body);
};
