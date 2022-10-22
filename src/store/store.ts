import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { appSlice } from './app/appSlice';

export const store = configureStore({
	reducer: {
		app: appSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Appthunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<String>>;
