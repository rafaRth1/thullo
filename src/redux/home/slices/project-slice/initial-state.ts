import { InitialStateSlice } from './types';

export const initialState: InitialStateSlice = {
	loading: false,
	projects: [],
	error: {
		type: false,
		msg: '',
	},
};
