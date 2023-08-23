import axios from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { BoardContext } from './BoardContext';
import { CardStateProps, ListTypes } from '@interfaces/';
import { fetchListsService } from '@pages/Home/services/list-service';
import { useParams } from 'react-router-dom';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const BoardProvider = ({ children }: Props) => {
	const [lists, setLists] = useState([] as ListTypes[]);
	const [taskCards, setTaskCards] = useState([] as CardStateProps[]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	const fetchLists = async (controller: AbortController, idProject?: string) => {
		setLoading(true);
		try {
			const { data } = await fetchListsService(controller, idProject);
			setLists(data);
			setTaskCards([...data[0].taskCards, ...data[1].taskCards, ...data[2].taskCards]);
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
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		fetchLists(controller, id);

		return () => {
			controller.abort();
		};
	}, []);

	const contextValues = useMemo(
		() => ({
			lists,
			setLists,
			fetchLists,
			loading,
			setLoading,
			taskCards,
			setTaskCards,
		}),
		[lists, taskCards, loading]
	);

	return <BoardContext.Provider value={contextValues}>{children}</BoardContext.Provider>;
};
