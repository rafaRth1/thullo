import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { projecSlice } from './home/slices/projectslice';
import { listSlice } from './home/slices/listsSlice';
// import { authSlice } from './auth';

export const store = configureStore({
	reducer: {
		projects: projecSlice.reducer,
		lists: listSlice.reducer,
		// auth: authSlice.reducer,
	},

	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false,
	// 	}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Appthunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<String>>;
