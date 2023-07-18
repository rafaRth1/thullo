import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { AppContext } from './AppContext';
import clientAxios from '../../config/clientAxios';
import { CardStateProps } from '../../interfaces/ListTaskCardTypes';
import { ListTypes, ProjectTypes } from '../../interfaces';
import { useToken } from '../../hooks';

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
	const [lists, setLists] = useState<{ lists: ListTypes[] }>({ lists: [] });
	const [project, setProject] = useState<ProjectTypes>({} as ProjectTypes);
	const [projects, setProjects] = useState<ProjectTypes[]>([]);
	const [listCurrent, setListCurrent] = useState('');
	const [cardUpdate, setCardUpdate] = useState(card);
	const [isShowModalFormList, setIsShowModalFormList] = useState(false);
	const [isShowModalRename, setIsShowModalRename] = useState(false);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const [isShowMenuProject, setIsShowMenuProject] = useState(false);
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [overflow, setOverflow] = useState(false);
	const [loading, setLoading] = useState(true);

	// Project
	const startProject = async (controller: AbortController, idProject?: string, idList?: string) => {
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
				await clientAxios(`/list/${idList}`, config),
			]);

			setProject(response[0].status === 'fulfilled' && response[0].value.data);
			setLists({ lists: response[1].status === 'fulfilled' && response[1].value.data });
			setLoading(false);
		} catch (error) {
			if (axios.isCancel(error)) {
				// console.log('Request Canceled Clear');
			} else {
				setAlertHigh({
					msg: 'Error obtener listas',
					error: true,
				});
				console.log(error);
			}
		}
	};

	// Listas
	const addList = async (e: React.FormEvent<HTMLFormElement>, nameList: string, id?: string) => {
		e.preventDefault();

		if (nameList.length <= 4) {
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.post(
				'/list',
				{
					name: nameList,
					project: id,
				},
				config
			);
			setLists({ lists: [...lists.lists, data] });
			setIsShowModalFormList(false);
		} catch (error) {
			setAlertHigh({
				msg: 'Error al crear una lista',
				error: true,
			});
		}
	};

	const updateList = async (idCard: string, idList: string) => {};

	const deleteList = async (id: string) => {
		try {
			const token = localStorage.getItem('token');
			const config: AxiosRequestConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.delete(`/list/${id}`, config);

			console.log(data);

			const listsUpdate = lists.lists.filter((list) => list._id !== id);
			setLists({ lists: listsUpdate });
		} catch (error) {
			console.log(error);
		}
	};

	// Cards
	const submitCard = async (cardState: CardStateProps) => {
		console.log(cardState._id);

		if (cardState?._id) {
			await handleEditCard(cardState);
		} else {
			await handleAddCard(cardState);
		}
	};

	const handleAddCard = async (cardState: CardStateProps) => {
		const card = {
			nameCard: cardState.nameCard,
			imgUlr: cardState.imgUlr,
			description: cardState.description,
			labels: cardState.labels,
			comments: cardState.comments,
			attachments: cardState.attachments,
			list: listCurrent,
		};

		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list) => list._id === listCurrent);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post('/taskCard', card);

			newColumn.taskCards = [...newColumn.taskCards, data];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);

			setIsShowModalFormCard(false);
		} catch (error) {
			setAlertHigh({
				msg: 'Error al crear un card',
				error: true,
			});
		}
	};

	const handleEditCard = async (cardState: CardStateProps) => {
		const listUpdate = Object.assign({}, lists);
		const [column] = listUpdate.lists.filter((list) => list._id === cardState.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = Object.assign({}, column);

		try {
			// const { data } = await clientAxios.put(`/taskCard/${cardState._id}`, cardState);

			// let update = newColumn.taskCards.map((taskCard: any) =>
			// 	taskCard._id === data._id ? data : taskCard
			// );

			console.log(cardState);

			// newColumn.taskCards = [...update];
			// listUpdate.lists.splice(columnIndex, 1, newColumn);
			// setLists(listUpdate);
		} catch (error) {
			setAlertHigh({
				msg: 'Error al editar',
				error: true,
			});
		}
	};

	return (
		<AppContext.Provider
			value={{
				lists,
				setLists,
				project,
				setProject,
				projects,
				setProjects,
				listCurrent,
				setListCurrent,
				addList,
				deleteList,
				alertHigh,
				setAlertHigh,
				isShowModalFormList,
				setIsShowModalFormList,
				updateList,
				overflow,
				setOverflow,
				loading,
				setLoading,
				submitCard,
				isShowModalFormCard,
				setIsShowModalFormCard,
				isShowModalRename,
				setIsShowModalRename,
				cardUpdate,
				setCardUpdate,
				startProject,
				isShowMenuProject,
				setIsShowMenuProject,
			}}>
			{children}
		</AppContext.Provider>
	);
};
