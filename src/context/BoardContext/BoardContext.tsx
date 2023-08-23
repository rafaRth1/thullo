import { CardStateProps, ListTypes } from '@interfaces/index';
import { createContext } from 'react';

type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BoardContextProps {
	lists: ListTypes[];
	setLists: DispatchStateAction<ListTypes[]>;
	fetchLists: (controller: AbortController, idProject?: string) => Promise<void>;
	loading: boolean;
	setLoading: DispatchStateAction<boolean>;
	taskCards: CardStateProps[];
	setTaskCards: DispatchStateAction<CardStateProps[]>;
}

export const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);
