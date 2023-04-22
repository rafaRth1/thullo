import { ImageProfile } from '../../../ImageProfile/ImageProfile';

interface Props {
	comment: Comment;
	authId: string;
	creatorProject: string;
	setValues: ({ _id, comment }: any) => void;
	handleDeleteComment: (id: string) => Promise<void>;
}

interface Comment {
	_id: string;
	name: string;
	dateCurrent: string;
	comment: string;
	colorImg: string;
	author: string;
}

export const Comments = ({ comment, authId, creatorProject, setValues, handleDeleteComment }: Props) => {
	return (
		<div className='card-comment mb-4'>
			<div className='flex  justify-between'>
				<div className='profile-author flex'>
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
				) : null}
			</div>

			<div className='body-comment text-white'>{comment.comment}</div>
		</div>
	);
};
