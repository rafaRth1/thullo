import { ImageProfile } from '@components/';
import { CommentTypes } from '@interfaces/index';

interface Props {
	comment: CommentTypes;
	authId: string;
	creatorProject: string;
	setValues: ({ _id, comment }: any) => void;
	handleDeleteComment: (id: string) => Promise<void>;
}

export const Comments = ({ comment, authId, creatorProject, setValues, handleDeleteComment }: Props) => {
	return (
		<div className='card-comment mb-4 ml-2'>
			<div className='flex justify-between'>
				<div className='profile-author flex gap-2'>
					<ImageProfile
						color={comment.colorImg}
						name={comment.name}
					/>
					<div className='flex flex-col'>
						<div className='name-author-comment text-white'>{comment.name}</div>
						<div className='date-comment text-neutral-500 text-sm'>{comment.dateCurrent}</div>
					</div>
				</div>

				{comment.author === authId || creatorProject === authId ? (
					<div className='actions-comments cursor-pointer text-yellow-500 flex gap-3'>
						<button
							type='button'
							className='text-sm hover:text-orange-500'
							onClick={() => setValues(comment)}>
							Edit
						</button>

						<button
							type='button'
							className='text-sm text-rose-600 hover:text-rose-700'
							onClick={() => handleDeleteComment(comment._id!)}>
							Delete
						</button>
					</div>
				) : null}
			</div>

			<div className='body-comment text-white mt-3'>{comment.comment}</div>
		</div>
	);
};
