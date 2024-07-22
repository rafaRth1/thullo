import { IoImageOutline } from 'react-icons/io5';

export const ImageModalCard = () => {
	return (
		<>
			<div className='image-card flex justify-center cursor-pointer items-center bg-neutral-700 rounded-xl p-2 border-dashed border-4'>
				<span className='mr-5 text-base text-zinc-500'>Add Image Card</span>
				<IoImageOutline
					size={25}
					className='text-zinc-500'
				/>
			</div>
		</>
	);
};
