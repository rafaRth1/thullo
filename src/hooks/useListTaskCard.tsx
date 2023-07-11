import clientAxios from '../config/clientAxios';
import { CardStateProps } from '../interfaces';
import { applyDrag } from '../utils';
import { useProvider } from './useProvider';

interface Props {
	_id: string;
	name: string;
	taskCards: CardStateProps[];
}

export const useListTaskCard = (list: Props) => {
	const { lists, setLists, setListCurrent, setIsShowModalFormCard, setCardUpdate, setIsShowModalRename } =
		useProvider();

	const handleEditCard = (card: CardStateProps) => {
		setIsShowModalFormCard(true);
		setCardUpdate(card);
	};

	const handleEditList = () => {
		setIsShowModalRename(true);
		setListCurrent(list._id);
	};

	const onCardDrop = async (
		columnId: string,
		dropResult: { addedIndex: number | null; payload?: CardStateProps; removedIndex: number | null }
	) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			const project = { ...lists };
			const [column] = project.lists.filter((list: { _id: string }) => list._id === columnId);
			const columnIndex = project.lists.indexOf(column);

			const newColumn = { ...column };
			newColumn.taskCards = applyDrag(newColumn.taskCards, dropResult);
			project.lists.splice(columnIndex, 1, newColumn);
			setLists(project);

			if (dropResult.removedIndex === dropResult.addedIndex) {
				return;
			} else {
				try {
					await clientAxios.put(`/list/update-list/${column._id}`, {
						taskCards: newColumn.taskCards,
						_idTaskCard: dropResult.payload?._id,
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	const getCardPayload = (columnId: string, index: number) => {
		return lists.lists.filter((p: { _id: string }) => p._id === columnId)[0].taskCards[index];
	};

	return {
		handleEditCard,
		handleEditList,
		onCardDrop,
		getCardPayload,
	};
};
