import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { BoardsPage, BoardPage, SearchPage } from '@pages/Home/pages';
import { BoardProvider } from '@context/';

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
					element={
						<BoardProvider>
							<BoardPage />
						</BoardProvider>
					}>
					<Route
						path='card/:idCard'
						element={null}
					/>
				</Route>

				<Route
					path='search'
					element={<SearchPage />}
				/>
			</Route>

			<Route
				path='/*'
				element={<Navigate to='/' />}
			/>
		</Routes>
	);
};
