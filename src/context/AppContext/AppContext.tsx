import { createContext } from 'react';
import { ListTypes, ProjectTypes, CardStateProps } from '../../interfaces';

export type DispatchStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface AppContextProps {
	project: ProjectTypes;
	setProject: DispatchStateAction<ProjectTypes>;
	projects: ProjectTypes[];
	setProjects: DispatchStateAction<ProjectTypes[]>;
	listCurrent: ListTypes;
	setListCurrent: DispatchStateAction<ListTypes>;
	alertHigh: { msg: string; error: boolean };
	setAlertHigh: DispatchStateAction<{ msg: string; error: boolean }>;
	isShowMenuProject: boolean;
	setIsShowMenuProject: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: DispatchStateAction<boolean>;
	isShowModalFormCard: boolean;
	setIsShowModalFormCard: DispatchStateAction<boolean>;
	cardUpdate: CardStateProps;
	setCardUpdate: DispatchStateAction<CardStateProps>;
	fetchProject: (controller: AbortController, idProject?: string) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
