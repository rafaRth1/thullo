import { useContext, ReactNode } from 'react';
import { PopoverContext } from './PopoverContext';

interface Props {
	children: (isShow: boolean, onClose: () => void) => JSX.Element;
}

export const PopoverContent = ({ children }: Props) => {
	const { isShow, setIsShow } = useContext(PopoverContext);

	const onClose = () => {
		setIsShow(false);
	};

	return children(isShow, onClose);
};

PopoverContent.displayName = 'Popover.PopoverContent';
