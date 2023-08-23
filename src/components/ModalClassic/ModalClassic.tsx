import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface Props {
	isShow: boolean;
	setIsShow?: React.Dispatch<React.SetStateAction<boolean>>;
	children: ReactElement;
}

export const ModalClassic = ({ isShow, children }: Props) => {
	if (!isShow) {
		return <></>;
	}

	return createPortal(children, document.body);
};
