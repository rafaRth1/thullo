import clientAxios from '../../../../config/clientAxios';
import { useState } from 'react';
import { useAuthProvider, useDate, useProvider } from '../../../../hooks';
import { ImageProfile } from '../../..';
import { CardStateProps } from '../../../../interfaces/ListTaskCardTypes';
import { Comments } from './Comment';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
}

export const SectionComments = ({ formState, setFormState }: Props) => {
	const [id, setId] = useState('');
	const [comment, setComment] = useState('');
	const { day, month, hours, minutes } = useDate();
	const date = `${day} ${month} at ${hours}:${minutes}`;
	const { auth } = useAuthProvider();
	const { lists, setLists, cardUpdate, project } = useProvider();

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

		// const listUpdate = Object.assign({}, lists);
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
			const { data } = await clientAxios.put(`/taskCard/comment/${id}`, { bodyComment: comment });

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
		const column = listUpdate.lists.find((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			await clientAxios.delete(`/taskCard/comment/${id}`);

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

	// let test = new Date(formState.comments[1].createdAt.split('T')[0].split('-'));

	// let opciones: Intl.DateTimeFormatOptions = {
	// 	day: 'numeric',
	// 	weekday: 'long',
	// 	month: 'long',
	// };

	// console.log(test.toLocaleDateString('es-ES', opciones));

	return (
		<div className='comments-content'>
			<div className='box-comment-add relative'>
				<div className='absolute top-7 left-4'>
					<ImageProfile
						name={auth.name}
						color={auth.colorImg}
					/>
				</div>

				<textarea
					className='w-full h-28 p-2 rounded-xl my-3 pl-14 pt-4 border-2 text-white bg-neutral-800 border-neutral-700 leading-4'
					placeholder='Write a comment...'
					name='comments'
					value={comment}
					onChange={(e) => setComment(e.target.value)}></textarea>

				<button
					type='button'
					className='bg-blue-600 text-white text-sm px-3 py-1 rounded-xl absolute bottom-8 right-4'
					onClick={() => handleSubmitComment()}>
					Comment
				</button>
			</div>

			<div className='list-comments w-full overflow-scroll overflow-x-hidden'>
				{formState?.comments.map((comment: any) => (
					<Comments
						key={comment._id}
						authId={auth._id}
						creatorProject={project.creator}
						comment={comment}
						setValues={setValues}
						handleDeleteComment={handleDeleteComment}
					/>
				))}
			</div>
		</div>
	);
};
