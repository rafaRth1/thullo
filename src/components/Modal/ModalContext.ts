import { createContext } from 'react';

export interface ModalContextProps {
	open: boolean;
	onOpenChange: () => void;
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
