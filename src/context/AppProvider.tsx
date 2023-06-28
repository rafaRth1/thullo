import axios, { CancelTokenSource } from 'axios';
import clientAxios from '../config/clientAxios';
import { useState } from 'react';
import { AppContext } from './AppContext';
import { CardStateProps } from '../interfaces/ListTaskCardTypes';

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
	const [lists, setLists] = useState<{
		lists: any[];
	}>({ lists: [] });
	const [project, setProject] = useState<any>({});
	const [projects, setProjects] = useState<any[]>([]);
	const [listCurrent, setListCurrent] = useState('');
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [modalFormList, setModalFormList] = useState(false);
	const [modalRename, setModalRename] = useState(false);
	const [isShowModalCard, setIsShowModalCard] = useState(false);
	const [overflow, setOverflow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [cardUpdate, setCardUpdate] = useState(card);

	// Project

	const getProject = async (id: string | undefined, cancelToken: CancelTokenSource) => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				cancelToken: cancelToken.token,
			};

			const { data } = await clientAxios.get(`/projects/${id}`, config);
			setProject(data);
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log('Cancelled');
			} else {
				// Handle error
			}
		}
	};

	// Listas

	const getLists = async (id: string | undefined, cancelToken: CancelTokenSource) => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},

				cancelToken: cancelToken.token,
			};

			const { data } = await clientAxios(`/list/${id}`, config);
			setLists({ lists: data });
			setLoading(false);
		} catch (error) {
			setAlertHigh({
				msg: 'Error obtener listas',
				error: true,
			});
			if (axios.isCancel(error)) {
				console.log('Cancelled');
			} else {
				// Handle error
			}
		}
	};

	const handleAddList = async (e: React.FormEvent<HTMLFormElement>, nameList: string, id?: string) => {
		e.preventDefault();

		if (nameList.length <= 4) {
			return;
		}

		try {
			const token = localStorage.getItem('token');

			const config = {
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
			1;

			setLists({ lists: [...lists.lists, data] });

			setAlertHigh({
				msg: 'Lista Creada',
				error: false,
			});

			showModalFormList();

			setTimeout(() => {
				setAlertHigh({
					msg: '',
					error: false,
				});
			}, 2000);
		} catch (error) {
			setAlertHigh({
				msg: 'Error al crear una lista',
				error: true,
			});
		}
	};

	const handleUpdateList = async (idCard: string, idList: string) => {};

	const showModalFormList = () => {
		setModalFormList(!modalFormList);
	};

	// Cards

	const submitCard = async (cardState: CardStateProps) => {
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
		const [column] = listUpdate.lists.filter((list: any) => list._id === listCurrent);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post('/taskCard', card);

			newColumn.taskCards = [...newColumn.taskCards, data];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);

			setIsShowModalCard(false);
		} catch (error) {
			setAlertHigh({
				msg: 'Error al crear un card',
				error: true,
			});
		}
	};

	const handleEditCard = async (cardState: CardStateProps) => {
		const listUpdate = Object.assign({}, lists);
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardState.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = Object.assign({}, column);

		try {
			const { data } = await clientAxios.put(`/taskCard/${cardState._id}`, cardState);

			let update = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === data._id ? data : taskCard
			);

			console.log(data);

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

	// useEffect(() => {
	// 	const handleGetProject = async () => {
	// 		try {
	// 			console.log(window.location.href.split('/')[4]);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};

	// 	handleGetProject();
	// }, []);

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
				handleAddList,
				alertHigh,
				setAlertHigh,
				modalFormList,
				showModalFormList,
				handleUpdateList,
				overflow,
				setOverflow,
				loading,
				setLoading,
				submitCard,
				isShowModalCard,
				setIsShowModalCard,
				modalRename,
				setModalRename,
				cardUpdate,
				setCardUpdate,
				getProject,
				getLists,
			}}>
			{children}
		</AppContext.Provider>
	);
};
