import { createContext } from 'react';
import { TaskCardTypes, ListTypes, ProjectTypes } from '@interfaces/';

type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BoardContextProps {
	listsArray: ListTypes[];
	lists: ListTypes[];
	setLists: DispatchStateAction<ListTypes[]>;
	listCurrent: ListTypes;
	setListCurrent: DispatchStateAction<ListTypes>;
	cardUpdate: TaskCardTypes;
	setCardUpdate: DispatchStateAction<TaskCardTypes>;
	loading: boolean;
	setLoading: DispatchStateAction<boolean>;
}

export const BoardContext = createContext<BoardContextProps>({} as BoardContextProps);
