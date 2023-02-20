import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from '../../pages';
import { BoardTrello, ListBoard } from '../../views';
import { TrelloLayout } from './TrelloLayout';

export const TrelloRouter = () => {
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
					element={<BoardTrello />}
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
