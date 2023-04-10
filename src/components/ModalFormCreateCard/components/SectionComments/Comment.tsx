import { useAuthProvider } from '../../../../hooks';
import { ImageProfile } from '../../../ImageProfile/ImageProfile';

interface Props {
	comment: Comment;
	setValues: ({ _id, comment }: any) => void;
	handleDeleteComment: (id: string) => Promise<void>;
}

interface Comment {
	_id: string;
	name: string;
	dateCurrent: string;
	comment: string;
}

export const Comments = ({ comment, setValues, handleDeleteComment }: Props) => {
	const { auth } = useAuthProvider();

	return (
		<div className='card-comment mb-4'>
			<div className='flex  justify-between'>
				<div className='profile-author flex'>
					<ImageProfile
						color={auth.colorImg}
						name={comment.name}
					/>
					<div className='flex flex-col'>
						<div className='name-author-comment text-white'>{comment.name}</div>
						<div className='date-comment text-neutral-500 text-sm'>{comment.dateCurrent}</div>
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
	);
};
