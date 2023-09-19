import { useMemo, useState, useCallback } from 'react';
import { Outlet, useHref, useParams } from 'react-router-dom';
import { BoardContext } from './BoardContext';
import { useGetListsQuery } from '@redux/home/apis';
import { TaskCardTypes, ListTypes } from '@interfaces/';

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

export const BoardProvider = ({ children }: Props) => {
	const [lists, setLists] = useState([] as ListTypes[]);
	const [cardUpdate, setCardUpdate] = useState(card);
	const [listCurrent, setListCurrent] = useState({} as ListTypes);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	const { data: listsArray = [] } = useGetListsQuery(id!);

	const contextValues = useMemo(
		() => ({
			listsArray,
			lists,
			setLists,
			loading,
			setLoading,
			listCurrent,
			setListCurrent,
			cardUpdate,
			setCardUpdate,
		}),
		[listsArray, lists, listCurrent, cardUpdate, loading]
	);

	return (
		<BoardContext.Provider value={contextValues}>
			<>
				{children}
				<Outlet />
			</>
		</BoardContext.Provider>
	);
};
