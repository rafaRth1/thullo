import { Navigate, Route, Routes } from 'react-router-dom';
import { BoardsPage, BoardPage, SearchPage } from '@pages/home/pages';
import { BoardProvider } from '@context/';
import { Home } from '@pages/home/home';

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
