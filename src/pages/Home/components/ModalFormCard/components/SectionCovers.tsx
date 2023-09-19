import { useState } from 'react';
import { useFormCardProvider } from '@hooks/';
import { OverlayImage } from '@components/';
import { useEditImageTaskCardMutation, usePickImageTaskCardMutation } from '@redux/home/apis';
import { IoSearch } from 'react-icons/io5';

export const SectionCovers = (): JSX.Element => {
	const [valueSearch, setValueSearch] = useState('');
	const [images, setImages] = useState<any[]>([]);
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const [pickImageTaskCard] = usePickImageTaskCardMutation();
	const [editImageTaskCard] = useEditImageTaskCardMutation();

	const handleSearchImage = async () => {
		if (!cardUpdate._id || valueSearch.length <= 2) {
			return;
		}

		const data = await fetch(
			`${import.meta.env.VITE_URL_UNSPLASH}/search/photos/?client_id=${
				import.meta.env.VITE_KEY_ACCESS_UNSPLASH
			}&query=${valueSearch}&per_page=12`
		);
		const { results } = await data.json();
		setImages(results);
		setValueSearch('');
	};

	const handlePickImage = async (image: string) => {
		editImageTaskCard({ idTaskCard: cardUpdate._id!, imgUlr: image })
			.unwrap()
			.then((response) => setCardUpdate({ ...cardUpdate, imgUlr: response.imgUlr }))
			.catch((error) => console.log(error));
	};

	const handleDeleteImage = () => {
		console.log('Eliminando imagen');
	};

	return (
		<div className='popup-cover bg-neutral-700 rounded-lg w-[240px] z-30 p-2 -mt-[3px]'>
			<div className='header-popup-cover'>
				<span className='text-white text-sm'>Photo Search</span>
				<p className='text-neutral-400 text-sm'>Search Unplash for photos</p>
			</div>

			<div className='flex relative items-center my-3'>
				<input
					type='text'
					name='name-image'
					placeholder='Keywords..'
					className='rounded bg-neutral-500 text-white text-xs focus-visible:outline-none w-full p-2'
					value={valueSearch}
					onChange={(e) => setValueSearch(e.target.value)}
				/>
				<button
					type='button'
					className='bg-blue-600 p-2 rounded absolute right-0'
					onClick={handleSearchImage}>
					<IoSearch className='text-white text-sm' />
				</button>
			</div>

			{cardUpdate.imgUlr && (
				<div className='delete-image mb-1'>
					<button
						type='button'
						className='text-white text-center rounded bg-red-600 hover:bg-red-700 w-full p-1 text-sm '
						onClick={handleDeleteImage}>
						Eliminar Imagen
					</button>
				</div>
			)}

			<div className='result-images flex flex-wrap'>
				{images.map((image) => (
					<div
						key={image.id}
						className='relative image-card cursor-pointer w-[46px] h-[50px] m-1'
						onClick={() => handlePickImage(image.urls.regular)}>
						<OverlayImage
							src={image.urls.regular}
							alt={image.alt_description}
							className='h-full w-full rounded-sm'
						/>
					</div>
				))}
			</div>
		</div>
	);
};
