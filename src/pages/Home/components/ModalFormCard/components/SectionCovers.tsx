import { useState, useContext } from 'react';
import { FormCardContext } from '@context/';
import Popover from '@components/Popover';
import { IoImage, IoSearch } from 'react-icons/io5';
import { OverlayImage } from '@components/';

export const SectionCovers = (): JSX.Element => {
	const { formState, handleDeleteImage, handleSelectImage } = useContext(FormCardContext);
	const [valueSearch, setValueSearch] = useState('');
	const [images, setImages] = useState<any[]>([]);

	const handleSearchImage = async () => {
		if (!formState._id || valueSearch.length <= 2) {
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

	return (
		<div className='mt-2'>
			<Popover preferredPosition='bottom-center'>
				<Popover.Trigger>
					<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
						<span className='pl-2'>
							<IoImage className='text-white mr-2 text-xs' />
						</span>
						<span className='text-neutral-200 capitalize text-xs'>Covers</span>
					</div>
				</Popover.Trigger>

				<Popover.Content>
					<div className='popup-cover bg-neutral-700 rounded-xl w-[235px] z-30 p-2 -mt-[3px]'>
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

						{formState.imgUlr && (
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
									onClick={() => handleSelectImage(image)}>
									<OverlayImage
										src={image.urls.regular}
										alt={image.alt_description}
										className='h-full w-full rounded-sm'
									/>
								</div>
							))}
						</div>
					</div>
				</Popover.Content>
			</Popover>
		</div>
	);
};
