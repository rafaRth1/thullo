import { Link } from 'react-router-dom';
import { ImageProfile } from './';

interface Props {
	project: {
		_id: string;
		name: string;
		name_img: string;
		collaborators: any[];
	};
}

export const CardBoard = ({ project }: Props) => {
	const { _id, name, collaborators, name_img } = project;

	return (
		<>
			<div
				className='card-board-container bg-neutral-800 rounded-lg p-2 cursor-pointer'
				// style={{ width: '300px', height: '300px' }}
			>
				<Link to={`/board/${_id}`}>
					<div className='card-board-image mb-3'>
						<img
							src={name_img}
							alt='Image Board'
							style={{ height: '190px' }}
							className='rounded-lg w-full object-cover'
						/>
					</div>

					<p className='card-board-name text-white text-xl mb-3'>{name}</p>

					<div className='list-users flex items-center'>
						{collaborators.map((collaborator: any) => (
							<ImageProfile
								key={collaborator._id}
								name={collaborator.name}
								color={collaborator.colorImg}
							/>
						))}

						{/* <span
							className='text-white text-sm cursor-pointer'
							onClick={() => console.log('See all users')}>
							+ 5 Others
						</span> */}
					</div>
				</Link>
			</div>
		</>
	);
};
