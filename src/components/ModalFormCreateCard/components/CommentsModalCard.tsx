import { ImagenProfile } from '../../Profile/ImagenProfile';
import ImagePerfilEx from '../../../assets/perfi-imagen-2.jpg';

export const CommentsModalCard = () => {
	return (
		<div className='comments-content'>
			<div className='box-comment-add relative'>
				{/* <span className='absolute top-7 left-5 text-neutral-500'>Write a comment...</span> */}

				<div className='absolute top-5 left-2'>
					<ImagenProfile imageProfile={ImagePerfilEx} />
				</div>

				<textarea
					className='w-full h-28 p-2 rounded-xl shadow-xl my-3 pl-14 pt-4'
					placeholder='Write a comment...'></textarea>

				<button className='bg-blue-500 text-white px-3 py-1 rounded-xl absolute bottom-6 right-3'>
					Comment
				</button>
			</div>

			<div className='list-comments w-full'>
				<div className='card-comment'>
					<div className='flex items-center justify-between'>
						<div className='profile-author flex'>
							<ImagenProfile imageProfile={ImagePerfilEx} />
							<div className='flex flex-col'>
								<div className='name-author-comment'>Mikael Stanley</div>
								<div className='date'>24 August at 20:03</div>
							</div>
						</div>

						<div className='actions-comments cursor-pointer'>Edit - Delete</div>
					</div>

					<div className='body-comment'>
						“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir
						Richard Burton
					</div>
				</div>

				<div className='card-comment mt-5'>
					<div className='flex items-center justify-between'>
						<div className='profile-author flex'>
							<ImagenProfile imageProfile={ImagePerfilEx} />
							<div className='flex flex-col'>
								<div className='name-author-comment'>Mikael Stanley</div>
								<div className='date'>24 August at 20:03</div>
							</div>
						</div>

						<div className='actions-comments cursor-pointer'>Edit - Delete</div>
					</div>

					<div className='body-comment'>
						“The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir
						Richard Burton
					</div>
				</div>
			</div>
		</div>
	);
};
