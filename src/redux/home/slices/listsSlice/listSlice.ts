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
			const { type, items, sourceIndex, destinationIndex } = action.payload;

			if (type === 'REORDER') {
				if (!state.lists[sourceIndex]) return;
				state.lists[sourceIndex].taskCards = items;
			} else {
				if (!state.lists[destinationIndex]) return;
				state.lists[sourceIndex].taskCards = items[sourceIndex];
				state.lists[destinationIndex].taskCards = items[destinationIndex];
			}
		},

		deleteList: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { idList, msg } = action.payload;

			const listsUpdate = state.lists.filter((list) => list._id !== idList);

			state.lists = listsUpdate;
		},

		addTaskCard: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { data, listIndex } = action.payload;

			if (!state.lists[listIndex]) {
				return;
			}

			state.lists[listIndex].taskCards = [...state.lists[listIndex].taskCards, data];
		},

		editTaskCard: (
			state: InitialStateListSlice,
			action: FulfilledAction<{ data: any; listId?: string }>
		) => {
			const { data, listId } = action.payload;
			const list = state.lists.find((list) => list._id === listId);

			if (list) {
				const taskCard = list?.taskCards.find((taskCard) => taskCard._id === data._id);
				if (taskCard) {
					taskCard.nameCard = data.nameCard || taskCard.nameCard;
					taskCard.description = data.description || taskCard.description;
				}
			}
		},

		deleteTaskCard: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { idTaskCard, listId } = action.payload;
			const list = state.lists.find((list) => list._id === listId);

			if (list) {
				list.taskCards = list.taskCards.filter((taskCard) => taskCard._id !== idTaskCard);
			}
		},

		addComment: (state: InitialStateListSlice, action: FulfilledAction<any>) => {
			const { data, listId, idTaskCard } = action.payload;
			const list = state.lists.find((list) => list._id === listId);

			if (list) {
				const taskCard = list.taskCards.find((taskCard) => taskCard._id === idTaskCard);
				if (taskCard) {
					taskCard.comments = [...taskCard.comments, data];
				}
			}
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
	addList,
	editList,
	deleteList,
	updateListDrag,
	addTaskCard,
	editTaskCard,
	deleteTaskCard,
	addComment,
	getProjectUdpate,
} = listSlice.actions;

// if (formState.description === cardUpdate.description) {
// 	return;
// } else {
// 	const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
// 		description: formState.description,
// 	});
// 	const listUpdate = lists;
// 	const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
// 	const columnIndex = listUpdate.indexOf(column);
// 	const newColumn = column;
// 	const formStateUpdate = { ...formState };
// 	formStateUpdate.description = data.description;
// 	setFormState(formStateUpdate);
// 	const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
// 		taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
// 	);
// 	newColumn.taskCards = [...taskCardUpdate];
// 	listUpdate.splice(columnIndex, 1, newColumn);
// 	setLists(listUpdate);
// }
