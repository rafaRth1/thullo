import { useState, useMemo } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { AppContext } from './AppContext';
import clientAxios from '../../utils/clientAxios';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { ListTypes, ProjectTypes } from '../../interfaces';

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
	// const [lists, setLists] = useState<{ lists: ListTypes[] }>({ lists: [] });
	const [lists, setLists] = useState<ListTypes[]>([]);
	const [project, setProject] = useState<ProjectTypes>({} as ProjectTypes);
	const [projects, setProjects] = useState<ProjectTypes[]>([]);
	const [listCurrent, setListCurrent] = useState('');
	const [cardUpdate, setCardUpdate] = useState(card);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [loading, setLoading] = useState(true);

	// Project

	// const startProject = async (controller: AbortController, idProject?: string, idList?: string) => {
	// 	try {
	// 		const token = localStorage.getItem('token');
	// 		const config: AxiosRequestConfig = {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			signal: controller.signal,
	// 		};

	// 		const response = await Promise.allSettled([
	// 			await clientAxios(`/projects/${idProject}`, config),
	// 			await clientAxios(`/list/${idList}`, config),
	// 		]);

	// 		setProject(response[0].status === 'fulfilled' && response[0].value.data);
	// 		setLists({ lists: response[1].status === 'fulfilled' && response[1].value.data });
	// 		setLoading(false);
	// 	} catch (error) {
	// 		if (axios.isCancel(error)) {
	// 			// <== console.log('Request Canceled Clear');
	// 		} else {
	// 			setAlertHigh({
	// 				msg: 'Error obtener listas',
	// 				error: true,
	// 			});
	// 			console.log(error);
	// 		}
	// 	}
	// };

	const startProject = async (controller: AbortController, idProject?: string) => {
		try {
			const token = localStorage.getItem('token');
			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				signal: controller.signal,
			};

			const response = await Promise.allSettled([
				await clientAxios(`/projects/${idProject}`, config),
				await clientAxios(`/list/${idProject}`, config),
			]);

			setProject(response[0].status === 'fulfilled' && response[0].value.data);
			setLists(response[1].status === 'fulfilled' && response[1].value.data);
			setLoading(false);
		} catch (error) {
			if (axios.isCancel(error)) {
				// <== console.log('Request Canceled Clear');
			} else {
				setAlertHigh({
					msg: 'Error obtener listas',
					error: true,
				});
				console.log(error);
			}
		}
	};

	const getProjects = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return;

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios('/projects', config);
			setProjects(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// const deleteList = async (id: string) => {
	// 	try {
	// 		const token = localStorage.getItem('token');
	// 		const config: AxiosRequestConfig = {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		};

	// 		const { data } = await clientAxios.delete(`/list/${id}`, config);

	// 		console.log(data);

	// 		const listsUpdate = lists.lists.filter((list) => list._id !== id);
	// 		setLists({ lists: listsUpdate });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const deleteList = async (id: string) => {
		// try {
		// 	const token = localStorage.getItem('token');
		// 	const config: AxiosRequestConfig = {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	};
		// 	const { data } = await clientAxios.delete(`/list/${id}`, config);
		// 	console.log(data);
		// 	const listsUpdate = lists.filter((list) => list._id !== id);
		// 	setLists(listsUpdate);
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	// Cards
	const submitCard = async (cardState: CardStateProps) => {
		if (!cardState?._id) {
			await handleAddCard(cardState);
		}
	};

	// const handleAddCard = async (cardState: CardStateProps) => {
	// 	const card = {
	// 		nameCard: cardState.nameCard,
	// 		imgUlr: cardState.imgUlr,
	// 		description: cardState.description,
	// 		labels: cardState.labels,
	// 		comments: cardState.comments,
	// 		attachments: cardState.attachments,
	// 		list: listCurrent,
	// 	};

	// 	const listCopied = { ...lists };
	// 	const [column] = listCopied.lists.filter((list) => list._id === listCurrent);
	// 	const columnIndex = listCopied.lists.indexOf(column);
	// 	const newColumn = { ...column };

	// 	try {
	// 		const { data } = await clientAxios.post('/taskCard', card);

	// 		newColumn.taskCards = [...newColumn.taskCards, data];
	// 		listCopied.lists.splice(columnIndex, 1, newColumn);
	// 		setLists(listCopied);

	// 		// setisShowModalCreateCard(false);
	// 	} catch (error) {
	// 		setAlertHigh({
	// 			msg: 'Error al crear un card',
	// 			error: true,
	// 		});
	// 	}
	// };

	const handleAddCard = async (cardState: CardStateProps) => {
		// const card = {
		// 	nameCard: cardState.nameCard,
		// 	imgUlr: cardState.imgUlr,
		// 	description: cardState.description,
		// 	labels: cardState.labels,
		// 	comments: cardState.comments,
		// 	attachments: cardState.attachments,
		// 	list: listCurrent,
		// };
		// const listCopied = lists;
		// const [column] = listCopied.filter((list) => list._id === listCurrent);
		// const columnIndex = listCopied.indexOf(column);
		// const newColumn = column;
		// try {
		// 	const { data } = await clientAxios.post('/taskCard', card);
		// 	newColumn.taskCards = [...newColumn.taskCards, data];
		// 	listCopied.splice(columnIndex, 1, newColumn);
		// 	setLists(listCopied);
		// 	// setisShowModalCreateCard(false);
		// } catch (error) {
		// 	setAlertHigh({
		// 		msg: 'Error al crear un card',
		// 		error: true,
		// 	});
		// }
	};

	const contextValue = useMemo(
		() => ({
			lists,
			setLists,
			project,
			setProject,
			projects,
			setProjects,
			getProjects,
			listCurrent,
			setListCurrent,
			deleteList,
			alertHigh,
			setAlertHigh,
			loading,
			setLoading,
			submitCard,
			isShowModalFormCard,
			setIsShowModalFormCard,
			cardUpdate,
			setCardUpdate,
			startProject,
			isShowMenuProject,
			setIsShowMenuProject,
			handleAddCard,
		}),
		[lists, project, projects, listCurrent, isShowMenuProject, loading, isShowModalFormCard, cardUpdate]
	);

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
