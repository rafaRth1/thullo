import { ProjectTypes } from '@interfaces/index';
import { InitialStateListSlice } from './types';

export const initialStateListSlice: InitialStateListSlice = {
	loading: false,
	lists: [],
	listsObject: {
		lists: [],
	},
	project: {} as ProjectTypes,
};
