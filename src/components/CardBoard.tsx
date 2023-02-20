import { Link } from 'react-router-dom';
import { ImageProfile } from './';
import ImagePerfilEx from '../assets/PerfilImage.png';

export const CardBoard = ({ project }: any) => {
	const { _id, name, collaborators, name_img } = project;
	return (
		<>
			<div
				className='card-board-container bg-neutral-800 rounded-lg p-2 cursor-pointer'
				style={{ height: '243px' }}>
				<Link to={`/board/${_id}`}>
					<div className='card-board-image mb-3'>
						<img
							src={name_img}
							alt=''
							style={{ height: '130px' }}
							className='rounded-lg w-full object-cover'
						/>
					</div>
					<p className='card-board-name text-white mb-5'>{name}</p>
					<div className='list-users flex items-center'>
						{collaborators.map((collaborator: any) => (
							<ImageProfile
								key={collaborator._id}
								name={collaborator.name}
								width='36'
								height='36'
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
