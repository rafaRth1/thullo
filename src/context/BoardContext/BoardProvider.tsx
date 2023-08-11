import { useMemo } from 'react';
import { BoardContext } from './BoardContext';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const BoardProvider = ({ children }: Props) => {
	const contextValues = useMemo(() => ({}), []);

	return <BoardContext.Provider value={contextValues}>{children}</BoardContext.Provider>;
};
