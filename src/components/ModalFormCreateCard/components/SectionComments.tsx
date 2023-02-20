import { useEffect, useState } from 'react';
import { useDate, useProvider } from '../../../hooks';
import { ImageProfile } from '../../';
import ImagePerfilEx from '../../../assets/perfi-imagen-2.jpg';
import clientAxios from '../../../config/clientAxios';

export const SectionComments = ({ formState, setFormState, clearValue, cards, setCards }: any) => {
	const [id, setId] = useState('');
	const [comment, setComment] = useState('');
	const { day, month, hours, minutes } = useDate();

	const handleSubmitComment = async () => {
		if (!id) {
			handleAddComment();
		} else {
			handleEditComment();
		}
	};

	const handleAddComment = async () => {
		try {
			const { data } = await clientAxios.post('/taskCard/comment', {
				comment,
				taskCard: formState._id,
			});
			const formStateUpdate = { ...formState };
			formStateUpdate.comments = [...formStateUpdate.comments, data.commentStore];
			setFormState(formStateUpdate);

			const taskCardUpdate = cards.map((card: any) =>
				card._id === data.taskCard._id ? data.taskCard : card
			);
			setCards(taskCardUpdate);

			setComment('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditComment = async () => {
		try {
			const { data } = await clientAxios.put(`/taskCard/comment/${id}`, { bodyComment: comment });
			const formStateUpdate = { ...formState };
			formStateUpdate.comments = formState.comments.map((comment: any) =>
				comment._id === data._id ? data : comment
			);

			setFormState(formStateUpdate);
			setComment('');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteComment = async (id: number) => {
		try {
			const { data } = await clientAxios.delete(`/taskCard/comment/${id}`);

			const formStateUpdate = { ...formState };
			formStateUpdate.comments = formStateUpdate.comments.filter((comment: any) => comment._id !== id);
			setFormState(formStateUpdate);

			const taskCardUpdate = cards.map((card: any) => (card._id === data._id ? data : card));
			setCards(taskCardUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const setValues = ({ _id, comment }: any) => {
		setId(_id);
		setComment(comment);
	};

	useEffect(() => {
		setComment('');
	}, [clearValue]);

	return (
		<div className='comments-content'>
			<div className='box-comment-add relative'>
				<div className='absolute top-7 left-4'>
					<ImageProfile imageProfile={ImagePerfilEx} />
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
					<div
						className='card-comment mb-4'
						key={comment?._id}>
						<div className='flex  justify-between'>
							<div className='profile-author flex'>
								<ImageProfile imageProfile={ImagePerfilEx} />
								<div className='flex flex-col'>
									<div className='name-author-comment text-white'>Mikael Stanley</div>
									<div className='date-comment text-neutral-500 text-sm'>{`
										${day} ${month} at ${hours}:${minutes}
										`}</div>
								</div>
							</div>

							<div className='actions-comments cursor-pointer text-neutral-500'>
								<button
									type='button'
									className='px-2 text-sm hover:text-orange-500'
									onClick={() => setValues(comment)}>
									Edit
								</button>
								-
								<button
									type='button'
									className='px-2 text-sm hover:text-red-500'
									onClick={() => handleDeleteComment(comment._id)}>
									Delete
								</button>
							</div>
						</div>

						<div className='body-comment text-white'>{comment.comment}</div>
					</div>
				))}
			</div>
		</div>
	);
};
