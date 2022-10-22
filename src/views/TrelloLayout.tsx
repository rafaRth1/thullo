import { HeaderTop, MainPage, SubHeaderTop } from './';
import { ModalFormCreateCard, ModalFormCreateList } from '../components';

export const TrelloLayout = () => {
	return (
		<>
			<HeaderTop />
			<SubHeaderTop />
			<MainPage />

			<ModalFormCreateList />
			<ModalFormCreateCard />
		</>
	);
};
