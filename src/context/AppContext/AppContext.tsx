import { createContext } from 'react';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { CancelTokenSource } from 'axios';

export interface AppContextProps {
	lists: {
		lists: any[];
	};
	setLists: React.Dispatch<
		React.SetStateAction<{
			lists: any[];
		}>
	>;
	project: {
		_id?: string;
		name: string;
		description: string;
		collaborators: any[];
		creator: string;
		type: string;
	};
	setProject: React.Dispatch<
		React.SetStateAction<{
			_id?: string;
			name: string;
			description: string;
			collaborators: any[];
			creator: string;
			type: string;
		}>
	>;
	projects: any[];
	setProjects: React.Dispatch<React.SetStateAction<any[]>>;
	listCurrent: string;
	setListCurrent: React.Dispatch<React.SetStateAction<string>>;
	alertHigh: {
		msg: string;
		error: boolean;
	};
	setAlertHigh: React.Dispatch<
		React.SetStateAction<{
			msg: string;
			error: boolean;
		}>
	>;
	handleAddList: (e: React.FormEvent<HTMLFormElement>, nameList: string, id?: string) => Promise<void>;
	isShowModalFormList: boolean;
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
	isShowModalRename: boolean;
	setIsShowModalRename: React.Dispatch<React.SetStateAction<boolean>>;
	isShowMenuProject: boolean;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	handleUpdateList: (idCard: string, idList: string) => Promise<void>;
	overflow: boolean;
	setOverflow: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	submitCard: (cardState: CardStateProps) => Promise<void>;
	isShowModalFormCard: boolean;
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
	cardUpdate: CardStateProps;
	setCardUpdate: React.Dispatch<React.SetStateAction<CardStateProps>>;
	getProject: (id: string | undefined, cancelToken: CancelTokenSource) => Promise<void>;
	getLists: (id: string | undefined, cancelToken: CancelTokenSource) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
