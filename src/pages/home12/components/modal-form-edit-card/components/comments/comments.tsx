import { useState } from 'react';
import { Button, Textarea } from '@nextui-org/react';
import { useAppSelector, useAuthProvider, useDate, useFormCardProvider } from '@hooks/';
import {
	useAddCommentTaskCardMutation,
	useDeleteCommentTaskCardMutation,
	useEditCommentTaskCardMutation,
} from '@redux/home/apis';
import { Comments } from './comment';
import { CommentTypes } from '@interfaces/';

export const SectionComments = () => {
	const { auth } = useAuthProvider();
	const [comment, setComment] = useState('');
	const [commentSelectd, setCommentSelectd] = useState({} as CommentTypes);
	const { project } = useAppSelector((state) => state.lists);
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const { day, month, hours, minutes } = useDate();
	const [addCommentTaskCard] = useAddCommentTaskCardMutation();
	const [editCommentTaskCard] = useEditCommentTaskCardMutation();
	const [deleteCommentTaskCard] = useDeleteCommentTaskCardMutation();

	const handleSubmitComment = async () => {
		if (commentSelectd._id) {
			handleEditComment();
		} else {
			handleAddComment();
		}
	};

	const handleAddComment = async () => {
		if (comment.trim() === '') {
			//  FIX: Manage data void comment
			return;
		}

		const commentValue = {
			comment,
			author: auth._id,
			name: auth.name,
			colorImg: auth.colorImg,
			dateCurrent: `${day} ${month} at ${hours}:${minutes}`,
			taskCard: cardUpdate._id,
		};

		await addCommentTaskCard({ commentValue })
			.unwrap()
			.then((response) => setCardUpdate({ ...cardUpdate, comments: [...cardUpdate.comments, response] }))
			.catch((error) => console.log(error));

		setComment('');
	};

	const handleEditComment = async () => {
		if (comment.trim() === '' || comment === commentSelectd.comment) {
			//  FIX: Manage data: comentario vacio o son iguales
			return;
		}

		await editCommentTaskCard({
			commentValue: comment,
			idCard: cardUpdate._id!,
			idComment: commentSelectd._id!,
		})
			.unwrap()
			.then((response) => {
				const commentUpdate = cardUpdate.comments.map((comment) => {
					if (comment._id === response._id) {
						return (comment = response);
					} else {
						return comment;
					}
				});

				// FIX: Edit date comment
				setCardUpdate({ ...cardUpdate, comments: commentUpdate });
				setComment('');
				setCommentSelectd({} as CommentTypes);
			})
			.catch((error) => console.log(error));
	};

	const handleDeleteComment = async (idComment: string) => {
		await deleteCommentTaskCard({ idCard: cardUpdate._id!, idComment })
			.unwrap()
			.then(() =>
				setCardUpdate({
					...cardUpdate,
					comments: cardUpdate.comments.filter((comment) => comment._id !== idComment),
				})
			)
			.catch((error) => console.log(error));
	};

	const setValues = (comment: CommentTypes) => {
		setComment(comment.comment);
		setCommentSelectd(comment);
	};

	return (
		<div className='comments-card-content'>
			<div className='box-comment-add relative'>
				<Textarea
					label={`${auth.name}:`}
					className='leading-4 rounded-xl'
					placeholder={`Escribir un comentario`}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
			</div>
			<Button
				type='button'
				color='primary'
				className='mt-3'
				onClick={() => handleSubmitComment()}>
				{commentSelectd._id ? 'Editar comentario' : 'Enviar'}
			</Button>

			<div className='list-comments w-full mt-4 pr-3 max-h-[338px] overflow-auto'>
				{cardUpdate.comments.map((comment) => (
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

{
}

// let test = new Date(formState.comments[1].createdAt.split('T')[0].split('-'));
// let opciones: Intl.DateTimeFormatOptions = {
// 	day: 'numeric',
// 	weekday: 'long',
// 	month: 'long',
// };
// console.log(test.toLocaleDateString('es-ES', opciones));
