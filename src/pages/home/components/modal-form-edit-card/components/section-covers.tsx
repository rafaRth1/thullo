import { useState } from 'react';
import { useEditImageTaskCardMutation, usePickImageTaskCardMutation } from '@redux/home/apis';
import { Button, Input } from '@nextui-org/react';
import { useFormCardProvider } from '@hooks/';
import { OverlayImage } from '@components/';
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
		// console.log('Eliminando imagen');
	};

	return (
		<div className='popup-cover z-30 p-3'>
			<div className='header-popup-cover'>
				<p>Buscar Imagen</p>
				<p className='text-neutral-400 text-sm'>Buscar por Unplash</p>
			</div>

			<div className='relative flex flex-col my-3'>
				<Input
					type='text'
					name='name-image'
					label='Palabra clave'
					className='mb-4'
					value={valueSearch}
					onChange={(e) => setValueSearch(e.target.value)}
				/>

				<Button
					type='button'
					color='primary'
					onClick={handleSearchImage}>
					<IoSearch className='text-white text-sm' />
				</Button>
			</div>

			{cardUpdate.imgUlr && (
				<div className='delete-image mb-1'>
					<Button
						type='button'
						color='danger'
						className='w-full'
						onClick={() => handleDeleteImage()}>
						Eliminar Imagen
					</Button>
				</div>
			)}

			<div className='result-images flex flex-wrap max-w-[224px]'>
				{images.map((image) => (
					<div
						key={image.id}
						className='relative image-card cursor-pointer w-[46px] h-[50px] m-1 hover:opacity-80 transition-all'
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
