import ReactDOM from 'react-dom';
import { useEffect } from 'react';

interface PropsModal {
	children: React.ReactNode | JSX.Element;
}

export const Modal = ({ children }: PropsModal) => {
	return ReactDOM.createPortal(children, document.body);
};
