import { useContext } from 'react';
import { BoardContext, BoardContextProps } from '@context/';

export const useBoardProvider = () => {
	return useContext<BoardContextProps>(BoardContext);
};
