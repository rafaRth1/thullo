import { ReactElement, useContext } from 'react';
import { PopoverContext } from './context/PopoverContext';
import { ContentInternal } from './ContentInternal';

interface Props {
	children: ReactElement | ReactElement[];
}

export const Content = ({ children }: Props) => {
	const { isShow } = useContext(PopoverContext);

	if (!isShow) {
		return <></>;
	}

	return <ContentInternal>{children}</ContentInternal>;
};
