import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { BoardsPage, BoardPage } from '@pages/Home/pages';

export const HomeRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}>
				<Route
					index
					element={<BoardsPage />}
				/>

				<Route
					path='board/:id'
					element={<BoardPage />}
				/>
			</Route>

			<Route
				path='/*'
				element={<Navigate to='/' />}
			/>
		</Routes>
	);
};
