import { ListTypes, ProjectTypes } from '@interfaces/index';

export interface InitialStateListSlice {
	loading: boolean;
	lists: ListTypes[];
	listsObject: {
		lists: ListTypes[];
	};
	project: ProjectTypes;
}
