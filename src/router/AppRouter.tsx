import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { HomeRouter } from './routes/HomeRouter';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/*'
				element={<HomeRouter />}
			/>

			<Route
				path='/auth/*'
				element={<AuthRouter />}
			/>
		</Routes>
	);
};
