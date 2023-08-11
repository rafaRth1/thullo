import { createContext } from 'react';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { ListTypes, ProjectTypes } from '../../interfaces';

export type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppContextProps {
	// lists: { lists: ListTypes[] };
	// setLists: DispatchStateAction<{ lists: ListTypes[] }>;
	lists: ListTypes[];
	setLists: DispatchStateAction<ListTypes[]>;
	project: ProjectTypes;
	setProject: DispatchStateAction<ProjectTypes>;
	projects: ProjectTypes[];
	setProjects: DispatchStateAction<ProjectTypes[]>;
	getProjects: () => Promise<void>;
	listCurrent: string;
	setListCurrent: DispatchStateAction<string>;
	alertHigh: { msg: string; error: boolean };
	setAlertHigh: DispatchStateAction<{ msg: string; error: boolean }>;
	// addList: (e: React.FormEvent<HTMLFormElement>, nameList: string, id?: string) => Promise<void>;
	deleteList: (id: string) => Promise<void>;
	// isShowModalFormList: boolean;
	// setIsShowModalFormList: DispatchStateAction<boolean>;
	// isShowModalRename: boolean;
	// setIsShowModalRename: DispatchStateAction<boolean>;
	isShowMenuProject: boolean;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	// isShowModalCreateCard: boolean;
	// setisShowModalCreateCard: DispatchStateAction<boolean>;
	loading: boolean;
	setLoading: DispatchStateAction<boolean>;
	submitCard: (cardState: CardStateProps) => Promise<void>;
	isShowModalFormCard: boolean;
	setIsShowModalFormCard: DispatchStateAction<boolean>;
	cardUpdate: CardStateProps;
	setCardUpdate: DispatchStateAction<CardStateProps>;
	startProject: (controller: AbortController, idProject?: string, idList?: string) => Promise<void>;
	handleAddCard: (cardState: CardStateProps) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
