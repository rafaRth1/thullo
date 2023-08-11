import { createSlice, current } from '@reduxjs/toolkit';
import { initialStateListSlice } from './initialStateListSlice';
import { InitialStateListSlice } from './types';
import { AxiosResponse } from 'axios';
import { applyDrag } from '@utils/applyDrag';

interface FulfilledAction<PromiseResult> {
	type: string;
	payload: PromiseResult;
}

export const listSlice = createSlice({
	name: 'listReducer',
	initialState: initialStateListSlice,
	reducers: {
		loadingStart: (state: InitialStateListSlice) => {
			state.loading = true;
		},

		startGetProjectAndLists: (
			state: InitialStateListSlice,
			action: FulfilledAction<{ project: any; lists: any }>
		) => {
			state.loading = false;
			state.project = action.payload.project;
			state.lists = action.payload.lists;
		},

		startGetProjectAndListsObject: (
			state: InitialStateListSlice,
			action: FulfilledAction<{ lists: any }>
		) => {
			// state.lists = action.payload.lists.lists;
			state.listsObject = action.payload;
		},

		addList: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			state.lists = [...state.lists, action.payload];
		},

		editList: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { _id } = action.payload;

			const listsUpdate = state.lists.map((list) => {
				if (list._id === _id) {
					return (list = { ...list, ...action });
				} else {
					return list;
				}
			});

			state.lists = listsUpdate;
		},

		updateListDrag: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			// const { dropResult, columnId } = action.payload;
			// const listsUpdate = state.lists;
			// let [column] = listsUpdate.filter((list: any) => list._id === columnId);
			// const columnIndex = listsUpdate.indexOf(column);
			// let newColumn = column;
			// newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);
			// listsUpdate.splice(columnIndex, 1, newColumn);
			// console.log(current(listsUpdate));
			// state.lists = action.payload;
		},

		deleteList: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { idList, msg } = action.payload;

			const listsUpdate = state.lists.filter((list) => list._id !== idList);

			state.lists = listsUpdate;
		},

		getProjectUdpate: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			state.project = { ...state.project, ...action.payload };
		},

		getCollaboratorsUpdate: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			state.project.collaborators = action.payload;
		},
	},
});

export const {
	loadingStart,
	startGetProjectAndLists,
	startGetProjectAndListsObject,
	addList,
	editList,
	deleteList,
	updateListDrag,
	getProjectUdpate,
} = listSlice.actions;
