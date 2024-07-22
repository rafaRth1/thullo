import { CommentTypes } from '@interfaces/index';
import { Avatar, Button } from '@nextui-org/react';

interface Props {
	comment: CommentTypes;
	authId: string;
	creatorProject: string;
	setValues: ({ _id, comment }: any) => void;
	handleDeleteComment: (id: string) => Promise<void>;
}

export const Comments = ({ comment, authId, creatorProject, setValues, handleDeleteComment }: Props) => {
	const { name, colorImg, dateCurrent, author, _id, comment: commentText } = comment;

	return (
		<div className='card-comment mb-6'>
			<div className='flex justify-between'>
				<div className='profile-author flex gap-2'>
					<Avatar
						name={name}
						radius='sm'
						style={{ backgroundColor: colorImg }}
					/>

					<div className='flex flex-col'>
						<p>{name}</p>
						<p className='text-neutral-500 text-sm'>{dateCurrent}</p>
					</div>
				</div>

				{author === authId || creatorProject === authId ? (
					<div className='actions-comments cursor-pointer text-yellow-500 flex gap-3'>
						<Button
							type='button'
							variant='light'
							color='warning'
							onClick={() => setValues(comment)}>
							Edit
						</Button>

						<Button
							type='button'
							color='danger'
							variant='light'
							onClick={() => handleDeleteComment(_id!)}>
							Delete
						</Button>
					</div>
				) : null}
			</div>

			<p className='body-comment text-white mt-3'>{commentText}</p>
		</div>
	);
};
