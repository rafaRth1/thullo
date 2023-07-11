import { createContext } from 'react';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { CancelTokenSource } from 'axios';
import { ListTypes, ProjectTypes } from '../../interfaces';

export type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppContextProps {
	lists: { lists: ListTypes[] };
	setLists: DispatchStateAction<{ lists: ListTypes[] }>;
	project: ProjectTypes;
	setProject: DispatchStateAction<ProjectTypes>;
	projects: ProjectTypes[];
	setProjects: DispatchStateAction<ProjectTypes[]>;
	listCurrent: string;
	setListCurrent: DispatchStateAction<string>;
	alertHigh: { msg: string; error: boolean };
	setAlertHigh: DispatchStateAction<{ msg: string; error: boolean }>;
	handleAddList: (e: React.FormEvent<HTMLFormElement>, nameList: string, id?: string) => Promise<void>;
	isShowModalFormList: boolean;
	setIsShowModalFormList: DispatchStateAction<boolean>;
	isShowModalRename: boolean;
	setIsShowModalRename: DispatchStateAction<boolean>;
	isShowMenuProject: boolean;
	setIsShowMenuProject: DispatchStateAction<boolean>;
	handleUpdateList: (idCard: string, idList: string) => Promise<void>;
	overflow: boolean;
	setOverflow: DispatchStateAction<boolean>;
	loading: boolean;
	setLoading: DispatchStateAction<boolean>;
	submitCard: (cardState: CardStateProps) => Promise<void>;
	isShowModalFormCard: boolean;
	setIsShowModalFormCard: DispatchStateAction<boolean>;
	cardUpdate: CardStateProps;
	setCardUpdate: DispatchStateAction<CardStateProps>;
	getProject: (id: string | undefined, cancelToken: CancelTokenSource) => Promise<void>;
	getLists: (id: string | undefined, cancelToken: CancelTokenSource) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
