import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { TrelloRouter } from '../trelloApp/routes/TrelloRouter';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/*'
				element={<TrelloRouter />}
			/>

			<Route
				path='/auth/*'
				element={<AuthRouter />}
			/>
		</Routes>
	);
};
