import clientAxios from '../../../config/clientAxios';
import { useProvider } from '../../../hooks';
import { CardStateProps } from '../../ListTaskCard/ListTaskCardTypes';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputNameCard = ({ formState, setFormState, onInputChange }: Props) => {
	const { cardUpdate, lists, setLists } = useProvider();

	const handleEditNameCard = async () => {
		if (formState.nameCard === cardUpdate.nameCard || formState._id === '') {
			return;
		} else {
			const listUpdate = { ...lists };
			const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = { ...column };

			try {
				const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
					nameCard: formState.nameCard,
				});

				const formStateUpdate = { ...formState };
				formStateUpdate.nameCard = data.nameCard;
				setFormState(formStateUpdate);

				const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
					taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
				);

				newColumn.taskCards = [...taskCardUpdate];
				listUpdate.lists.splice(columnIndex, 1, newColumn);
				setLists(listUpdate);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='input-name-card mb-5 flex items-center'>
			<input
				type='text'
				placeholder='Name card example'
				name='nameCard'
				value={formState?.nameCard}
				onChange={(e) => onInputChange(e)}
				onBlur={handleEditNameCard}
				className='bg-transparent focus-visible:outline-0 flex-1 w-full text-white'
			/>
		</div>
	);
};
