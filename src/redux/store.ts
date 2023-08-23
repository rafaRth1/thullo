import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { projecSlice } from './home/slices/projectslice';
import { listSlice } from './home/slices/listsSlice';
import { listApi } from './home/apis/list-api';
import { projectApi } from './home/apis/project-api';
// import { authSlice } from './auth';

export const store = configureStore({
	reducer: {
		projects: projecSlice.reducer,
		lists: listSlice.reducer,
		// auth: authSlice.reducer,
		[listApi.reducerPath]: listApi.reducer,
		[projectApi.reducerPath]: projectApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(listApi.middleware, projectApi.middleware),

	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false,
	// 	}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Appthunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<String>>;
