import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { InitialStateSlice } from './types';

interface FulfilledAction<PromiseResult> {
	type: string;
	payload: PromiseResult;
}

export const projecSlice = createSlice({
	name: 'homeReducer',
	initialState: initialState,
	reducers: {
		loadingStart: (state: InitialStateSlice) => {
			state.loading = true;
		},

		loadingFinish: (state: InitialStateSlice) => {
			state.loading = false;
		},

		loadingError: (state: InitialStateSlice, action: FulfilledAction<string>) => {
			state.error.type = true;
			state.error.msg = action.payload;
		},

		getProjects: (state: InitialStateSlice, action: FulfilledAction<[]>) => {
			state.projects = action.payload;
			state.loading = false;
		},

		addProject: (state: InitialStateSlice, action: any) => {
			state.projects = [...state.projects, action.payload];
		},

		updateProject: (state: InitialStateSlice, action: any) => {},

		deleteProject: (state: InitialStateSlice, action: any) => {},
	},
});

export const { loadingStart, loadingFinish, loadingError, getProjects, addProject } = projecSlice.actions;
