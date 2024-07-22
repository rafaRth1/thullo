import { Link } from 'react-router-dom';
import { OverlayImage } from '@components/';
import { ProjectTypes } from '@interfaces/';
import { IoAddOutline } from 'react-icons/io5';
import { Avatar } from '@nextui-org/react';

interface Props {
	project: ProjectTypes;
}

export const CardBoard = ({ project }: Props) => {
	const { _id, name_board, collaborators, name_img } = project;

	return (
		<>
			<div className='card-board-container bg-[#18181a] cursor-pointer rounded-lg p-3 mr-4 mb-4'>
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

					<p className='card-board-name text-neutral-200 mb-3'>{name_board}</p>

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
								<Avatar
									key={collaborator._id}
									name={collaborator.name}
									style={{ backgroundColor: collaborator.colorImg }}
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
