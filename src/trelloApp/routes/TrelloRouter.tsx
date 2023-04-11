import { Navigate, Route, Routes } from 'react-router-dom';
import { BoardContainer, Profile } from '../../pages';
import { TrelloLayout } from './TrelloLayout';
import { ListBoard } from '../../components';

export const TrelloRouter = (): JSX.Element => {
	return (
		<Routes>
			<Route
				path='/'
				element={<TrelloLayout />}>
				<Route
					index
					element={<ListBoard />}
				/>

				<Route
					path='board/:id'
					element={<BoardContainer />}
				/>

				{/* <Route
					path='/profile/:id'
					element={<Profile />}
				/> */}
			</Route>

			<Route
				path='/*'
				element={<Navigate to='/' />}
			/>
		</Routes>
	);
};
