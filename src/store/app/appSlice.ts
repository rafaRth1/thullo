import { createSlice } from '@reduxjs/toolkit';
import { initialState, AppTypes } from './';

export const appSlice = createSlice({
	name: 'appReducer',
	initialState,
	reducers: {
		loadingStart: (state: AppTypes) => {},

		handleShowModal: (state: AppTypes, action: any) => {
			state.showModal = action.payload;
		},

		handleShowModalCard: (state: AppTypes, action: any) => {
			state.showModalCard = action.payload;
		},

		setImages: (state: AppTypes, action: any) => {
			state.resultImages = action.payload;
		},
	},
});

export const { handleShowModal, handleShowModalCard, setImages } = appSlice.actions;
