import { useContext } from 'react';
import { FormCardContext } from '../../../../context';
import { useAuthProvider, useComment, useProvider } from '../../../../hooks';
import { ImageProfile } from '../../..';
import { Comments } from './Comment';

export const SectionComments = () => {
	const { formState, setFormState } = useContext(FormCardContext);
	const { auth } = useAuthProvider();
	const { project } = useProvider();
	const { comment, setComment, handleDeleteComment, handleSubmitComment, setValues } = useComment({
		formState,
		setFormState,
	});

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

// let test = new Date(formState.comments[1].createdAt.split('T')[0].split('-'));
// let opciones: Intl.DateTimeFormatOptions = {
// 	day: 'numeric',
// 	weekday: 'long',
// 	month: 'long',
// };
// console.log(test.toLocaleDateString('es-ES', opciones));
