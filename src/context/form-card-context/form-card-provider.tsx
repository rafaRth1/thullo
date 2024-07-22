import { ReactElement, useState, useMemo, useEffect } from 'react';
import { FormCardContext } from './form-card-context';
import { TaskCardTypes } from '@interfaces/';

interface Props {
	children: ReactElement;
	cardUpdateState: TaskCardTypes;
}

const card: TaskCardTypes = {
	_id: '',
	nameCard: '',
	imgUlr: '',
	description: '',
	attachments: [],
	comments: [],
	labels: [],
	members: [],
};

export const FormCardProvider = ({ children, cardUpdateState }: Props) => {
	const [cardUpdate, setCardUpdate] = useState(card);

	// console.log(cardUpdateState)

	const value = useMemo(
		() => ({
			cardUpdate,
			setCardUpdate,
		}),
		[cardUpdate]
	);

	useEffect(() => {
		setCardUpdate(cardUpdateState);
	}, [cardUpdateState]);

	return <FormCardContext.Provider value={value}>{children}</FormCardContext.Provider>;
};

// const handleAssignMember = async (pickMembers: any) => {
// 	// if (!formState._id) {
// 	// 	return;
// 	// }
// 	// const listUpdate = lists;
// 	// const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
// 	// const columnIndex = listUpdate.indexOf(column);
// 	// const newColumn = column;
// 	// try {
// 	// 	const { data } = await clientAxios.post(`/taskCard/member/${formState._id}`, {
// 	// 		members: pickMembers,
// 	// 	});
// 	// 	const formStateUpdate = { ...formState };
// 	// 	formStateUpdate.members = data;
// 	// 	setFormState(formStateUpdate);
// 	// 	const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
// 	// 		taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
// 	// 	);
// 	// 	newColumn.taskCards = [...taskCardUpdate];
// 	// 	listUpdate.splice(columnIndex, 1, newColumn);
// 	// 	setLists(listUpdate);
// 	// } catch (error) {
// 	// 	console.log(error);
// 	// }
// };

// const handleSearchUser = async (
// 	setValueSearch: React.Dispatch<React.SetStateAction<any[]>>,
// 	setValue: React.Dispatch<React.SetStateAction<string>>
// ) => {
// 	// if (!formState._id) {
// 	// 	return;
// 	// }
// 	// try {
// 	// 	const { data } = await clientAxios.get(`/taskCard/member/${project._id}`);
// 	// 	setValueSearch(data);
// 	// 	setValue('');
// 	// } catch (error) {
// 	// 	console.log(error);
// 	// }
// };
