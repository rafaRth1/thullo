import axios from 'axios';
import { useState, useMemo, useEffect } from 'react';
import { AppContext } from './AppContext';
import { ListTypes, ProjectTypes, CardStateProps } from '../../interfaces';
import { fetchProjectService } from '@pages/Home/services/list-service';

interface Props {
	children: JSX.Element | JSX.Element[];
}

let card: CardStateProps = {
	_id: '',
	nameCard: '',
	attachments: [],
	comments: [],
	description: '',
	imgUlr: '',
	labels: [],
	members: [],
};

export const AppProvider = ({ children }: Props): JSX.Element => {
	const [project, setProject] = useState<ProjectTypes>({} as ProjectTypes);
	const [projects, setProjects] = useState<ProjectTypes[]>([]);
	const [listCurrent, setListCurrent] = useState({} as ListTypes);
	const [cardUpdate, setCardUpdate] = useState(card);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [loading, setLoading] = useState(true);

	const fetchProject = async (controller: AbortController, idProject?: string) => {
		try {
			const { data } = await fetchProjectService(controller, idProject);
			setProject(data);
		} catch (error) {
			if (axios.isCancel(error)) {
				// <== console.log('Request Canceled Clear');
			} else {
				// setAlertHigh({
				// 	msg: 'Error obtener listas',
				// 	error: true,
				// });
				console.log(error);
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			project,
			setProject,
			projects,
			setProjects,
			listCurrent,
			setListCurrent,
			alertHigh,
			setAlertHigh,
			loading,
			setLoading,
			isShowModalFormCard,
			setIsShowModalFormCard,
			cardUpdate,
			setCardUpdate,
			isShowMenuProject,
			setIsShowMenuProject,
			fetchProject,
		}),
		[project, listCurrent, isShowMenuProject, loading, isShowModalFormCard, cardUpdate]
	);

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
