import { createContext } from 'react';

interface ModalContextProps {
	isShow: boolean;
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
