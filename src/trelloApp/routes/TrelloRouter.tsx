import { Route, Routes } from 'react-router-dom';
import { TrelloLayout } from '../../views';

export const TrelloRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<TrelloLayout />}></Route>
		</Routes>
	);
};
