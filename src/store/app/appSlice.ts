import { createSlice } from '@reduxjs/toolkit';
import { initialState, AppTypes } from './';

export const appSlice = createSlice({
	name: 'appReducer',
	initialState,
	reducers: {
		loadingStart(state: AppTypes) {},

		handleShowModal(state: AppTypes, action: any) {
			state.showModal = action.payload;
		},

		handleShowModalCard(state: AppTypes, action: any) {
			state.showModalCard = action.payload;
		},

		addListItem(state: AppTypes, action: any) {
			state.lists = [action.payload, ...state.lists];
		},

		addCardtoList(state: AppTypes, action: any) {
			// state.lists =
		},
	},
});

export const { handleShowModal, addListItem, handleShowModalCard, addCardtoList } = appSlice.actions;
