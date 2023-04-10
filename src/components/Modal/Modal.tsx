import ReactDOM from 'react-dom';
import { useEffect } from 'react';

interface PropsModal {
	children: React.ReactNode | JSX.Element;
}

export const Modal = ({ children }: PropsModal) => {
	// const portalNode = document.createElement('div');
	// const modalRoot = document.querySelector('#modal');

	// useEffect(() => {
	// 	modalRoot?.appendChild(portalNode)

	// 	return () => {
	// 		modalRoot?.removeChild(portalNode)
	// 	};
	// }, [portalNode]);

	return ReactDOM.createPortal(children, document.querySelector('#modal')!);
};
