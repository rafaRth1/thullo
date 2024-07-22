import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from './app-context';
import { useObtainProjectQuery } from '@redux/home/apis';
import { ListTypes, ProjectTypes, TaskCardTypes } from '../../interfaces';
import { skipToken } from '@reduxjs/toolkit/dist/query';

interface Props {
	children: JSX.Element | JSX.Element[];
}

let card: TaskCardTypes = {
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
	const [projects, setProjects] = useState<ProjectTypes[]>([]);
	const [listCurrent, setListCurrent] = useState({} as ListTypes);
	const [cardUpdate, setCardUpdate] = useState(card);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const { data: project = {} as ProjectTypes, isLoading: isLoadingProject } = useObtainProjectQuery(id ?? skipToken);

	const contextValue = useMemo(
		() => ({
			project,
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
			isLoadingProject,
		}),
		[listCurrent, isShowMenuProject, loading, isShowModalFormCard, cardUpdate, project]
	);

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
