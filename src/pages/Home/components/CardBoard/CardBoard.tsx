import { Link } from 'react-router-dom';
import { ImageProfile, OverlayImage } from '@components/';
import { ProjectTypes } from '@interfaces/';
import { IoAddOutline } from 'react-icons/io5';

interface Props {
	project: ProjectTypes;
}

export const CardBoard = ({ project }: Props) => {
	const { _id, name, collaborators, name_img } = project;

	return (
		<>
			<div className='card-board-container bg-neutral-800 cursor-pointer rounded-lg p-2 mr-4 mb-4 shadow-[10px_10px_10px_-5px_rgba(0,0,0,0.4)]'>
				<Link to={`/board/${_id}`}>
					<div className='card-board-image relative mb-3 w-72'>
						{name_img ? (
							<OverlayImage
								src={name_img}
								alt='Image Board'
								className='rounded-lg w-full object-cover h-[190px]'
							/>
						) : (
							<OverlayImage
								src='https://i.pinimg.com/originals/85/a3/09/85a309ce4204e643f6ccb4c45d4bce4b.jpg'
								alt='Image Board'
								className='rounded-lg w-full object-cover h-[190px]'
							/>
						)}
					</div>

					<p className='card-board-name text-white text-xl mb-3'>{name}</p>

					<div className='list-users flex items-center gap-3'>
						{collaborators.length === 0 ? (
							<span className='bg-blue-500 inline-flex items-center justify-center cursor-pointer object-cover rounded-md text-3xl w-9 h-9 '>
								<IoAddOutline
									className='text-neutral-200'
									size={20}
								/>
							</span>
						) : (
							collaborators.map((collaborator) => (
								<ImageProfile
									key={collaborator._id}
									name={collaborator.name}
									color={collaborator.colorImg}
								/>
							))
						)}

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
