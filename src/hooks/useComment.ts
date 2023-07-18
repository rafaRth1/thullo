import clientAxios from '../config/clientAxios';
import { useState } from 'react';
import { useProvider, useAuthProvider, useDate } from './';
import { CardStateProps } from '../interfaces';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
}

export const useComment = ({ formState, setFormState }: Props) => {
	const [id, setId] = useState('');
	const [comment, setComment] = useState('');
	const { lists, setLists, cardUpdate } = useProvider();
	const { auth } = useAuthProvider();
	const { day, month, hours, minutes } = useDate();
	const date = `${day} ${month} at ${hours}:${minutes}`;

	const handleSubmitComment = async () => {
		if (!id) {
			handleAddComment();
		} else {
			handleEditComment();
		}
	};

	const handleAddComment = async () => {
		if (comment.length <= 5) {
			console.log('Ingrese mas caracteres');
			return;
		}

		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post('/taskCard/comment', {
				taskCard: formState._id,
				author: auth._id,
				name: auth.name,
				colorImg: auth.colorImg,
				comment,
				dateCurrent: date,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.comments = [...formStateUpdate.comments, data];
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);

			setLists(listUpdate);
			setComment('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditComment = async () => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.put(`/taskCard/comment/${formState._id}`, {
				id: id,
				bodyComment: comment,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.comments = formState.comments.map((comment: any) =>
				comment._id === data._id ? data : comment
			);
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
			setComment('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteComment = async (id: string) => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post(`/taskCard/comment-delete/${formState._id}`, {
				idComment: id,
			});

			console.log(data);

			const formStateUpdate = { ...formState };
			formStateUpdate.comments = formStateUpdate.comments.filter((comment: any) => comment._id !== id);
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
	};

	const setValues = ({ _id, comment }: any) => {
		setId(_id);
		setComment(comment);
	};

	return {
		comment,
		setComment,
		handleSubmitComment,
		handleDeleteComment,
		setValues,
	};
};
