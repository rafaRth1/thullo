import { createContext } from 'react';

export interface AppContextProps {
	lists: any[];
	setLists: React.Dispatch<React.SetStateAction<any[]>>;
	project: any;
	setProject: React.Dispatch<React.SetStateAction<{}>>;
	projects: any[];
	setProjects: React.Dispatch<React.SetStateAction<any[]>>;
	handleAddList: (e: any, nameList: string, id?: string) => Promise<void>;
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
	modalFormList: boolean;
	showModalFormList: () => void;
	handleUpdateList: (idCard: string, idList: string) => Promise<void>;
	overflow: boolean;
	setOverflow: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
