import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import clientAxios from '../config/clientAxios';
import { useParams } from 'react-router-dom';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const AppProvider = ({ children }: Props) => {
	const [project, setProject] = useState<any>({});
	const [projects, setProjects] = useState<any[]>([]);
	const [lists, setLists] = useState<{
		lists: any[];
	}>({ lists: [] });
	const [alertHigh, setAlertHigh] = useState({ msg: '', error: false });
	const [modalFormList, setModalFormList] = useState(false);
	const [overflow, setOverflow] = useState(false);
	const [loading, setLoading] = useState(true);

	// Listas

	const handleAddList = async (e: any, nameList: string, id?: string) => {
		e.preventDefault();

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

	const handleUpdateList = async (idCard: string, idList: string) => {
		// let listNext = lists.find((list: any) => list._id === idList);
		// let listPrev: any;
		// let cardPrev: any;
		// lists.map((list: any) => {
		// 	list.taskCards.map((card: any) => {
		// 		if (card._id === idCard) {
		// 			cardPrev = card;
		// 			listPrev = list;
		// 		}
		// 	});
		// });
		// let cardRemove: any[] = listPrev.taskCards.filter((item: any) => item._id !== idCard);
		// if (listNext._id === listPrev._id) {
		// 	listPrev.taskCards = [...listPrev.taskCards];
		// } else {
		// 	await clientAxios.post(`/list/${idCard}`, {
		// 		listIdNext: listNext._id,
		// 		listIdPrev: listPrev._id,
		// 	});
		// 	listNext.taskCards = [...listNext.taskCards, cardPrev];
		// 	listPrev.taskCards = [...cardRemove];
		// 	setLists([...lists]);
		// }
	};

	const showModalFormList = () => {
		setModalFormList(!modalFormList);
	};

	// Cards

	return (
		<AppContext.Provider
			value={{
				lists,
				setLists,
				project,
				setProject,
				projects,
				setProjects,
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
			}}>
			{children}
		</AppContext.Provider>
	);
};
