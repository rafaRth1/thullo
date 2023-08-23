import { useContext, useState, useEffect } from 'react';
import { FormCardContext } from '@context/';
import { useAppDispatch, useAppSelector, useAuthProvider, useDate, useProvider } from '@hooks/';
import { ImageProfile } from '@components/';
import { useComment } from './hooks/useComment';
import { addCommentThunk } from '@redux/home/slices/listsSlice';
import { Comments } from './Comment';

export const SectionComments = () => {
	const [id, setId] = useState('');
	const [comment, setComment] = useState('');
	const { formState, setFormState } = useContext(FormCardContext);
	const { auth } = useAuthProvider();
	const { lists } = useAppSelector((state) => state.lists);
	const { project, cardUpdate, setCardUpdate } = useProvider();
	const { handleDeleteComment } = useComment({
		formState,
		setFormState,
	});
	const { day, month, hours, minutes } = useDate();
	const dispatch = useAppDispatch();

	const handleSubmitComment = async () => {
		if (!id) {
			handleAddComment();
		} else {
			handleEditComment();
		}
	};

	const handleAddComment = () => {
		if (comment.trim() === '') {
			console.log('Void Comment');
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

		dispatch(addCommentThunk(commentValue, cardUpdate.list, cardUpdate._id));
	};

	const handleEditComment = () => {
		console.log('Edit Comment');
	};

	const setValues = ({ _id, comment }: { _id: string; comment: string }) => {
		setId(_id);
		setComment(comment);
	};

	useEffect(() => {
		const list = lists.find((list) => list._id === cardUpdate.list);
		const taskCard = list?.taskCards.find((taskCard) => taskCard._id === cardUpdate._id);
		setCardUpdate((state) => ({
			...state,
			comments: [...taskCard!.comments],
		}));
	}, [lists]);

	return (
		<div className='comments-card-content'>
			<div className='box-comment-add relative'>
				<div className='absolute top-7 left-4'>
					<ImageProfile
						name={auth.name}
						color={auth.colorImg}
					/>
				</div>

				<textarea
					className='w-full h-28 p-2 rounded-xl my-3 pl-16 pt-6 border-2 text-white bg-neutral-800 border-neutral-700 leading-4'
					placeholder='Write a comment...'
					name='comments'
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>

				<button
					type='button'
					className='bg-blue-600 text-white text-sm px-3 py-1 rounded-xl absolute bottom-8 right-4'
					onClick={() => handleSubmitComment()}>
					Comment
				</button>
			</div>

			<div className='list-comments w-full overflow-scroll overflow-x-hidden'>
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

// let test = new Date(formState.comments[1].createdAt.split('T')[0].split('-'));
// let opciones: Intl.DateTimeFormatOptions = {
// 	day: 'numeric',
// 	weekday: 'long',
// 	month: 'long',
// };
// console.log(test.toLocaleDateString('es-ES', opciones));
