import { useMemo } from 'react';
import { ModalContext } from './ModalContext';

interface Props {
	children: React.ReactNode;
	open: boolean;
	onOpenChange: () => void;
}

export const ModalProvider = ({ children, open, onOpenChange }: Props) => {
	const contextValue = useMemo(() => ({ open, onOpenChange }), [open]);

	return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
