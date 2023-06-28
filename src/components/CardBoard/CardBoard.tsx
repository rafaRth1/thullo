import { Link } from 'react-router-dom';
import { ImageProfile } from '..';

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
			<div className='card-board-container bg-neutral-800 cursor-pointer rounded-lg p-2 mr-4 mb-4'>
				<Link to={`/board/${_id}`}>
					<div className='card-board-image mb-3 w-72'>
						{!!project.name_img ? (
							<img
								src={name_img}
								alt='Image Board'
								className='rounded-lg w-full object-cover'
							/>
						) : (
							<img
								src='https://i.pinimg.com/originals/85/a3/09/85a309ce4204e643f6ccb4c45d4bce4b.jpg'
								alt='Image Board'
								style={{ height: '190px' }}
								className='rounded-lg w-full object-cover'
							/>
						)}
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
