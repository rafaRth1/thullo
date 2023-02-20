import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { startSearchImage } from '../../../store';
import { LabelPopup } from './';
import { IoImage, IoSearch } from 'react-icons/io5';

export const SectionCovers = ({ formState, setFormState, clearValue }: any): JSX.Element => {
	const [valueSearch, setValueSearch] = useState<string>('');
	const dispatch = useAppDispatch();
	const { resultImages } = useAppSelector((state) => state.app);

	const handleSearchImage = () => {
		if (valueSearch.length <= 2) {
			return;
		}

		dispatch(startSearchImage(valueSearch));
		setValueSearch('');
	};

	const handleSelectImage = (image: any) => {
		setFormState((prevState: any) => ({
			...prevState,
			imgUlr: image.urls.regular,
		}));
	};

	useEffect(() => {
		setValueSearch('');
	}, [clearValue]);

	return (
		<div className='mt-2'>
			<LabelPopup
				nameLabel='Covers'
				IconLabel={IoImage}
				clearValue={clearValue}>
				<div
					className='popup-cover absolute mt-2 z-30 bg-neutral-700 rounded-xl p-2'
					style={{ width: '245px' }}>
					<div className='header-popup-cover'>
						<span className='text-white text-sm'>Photo Search</span>
						<p className='text-neutral-400 text-sm'>Search Unplash for photos</p>
					</div>

					<div className='image-search flex relative items-center my-3'>
						<input
							type='text'
							placeholder='Keywords..'
							className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none'
							value={valueSearch}
							onChange={(e) => setValueSearch(e.target.value)}
						/>
						<button
							className='bg-blue-600 p-2 rounded absolute right-0'
							onClick={handleSearchImage}>
							<IoSearch className='text-white text-sm' />
						</button>
					</div>

					<div className='result-images flex flex-wrap'>
						{resultImages.map((image) => (
							<div
								key={image.id}
								className='image-card m-1 cursor-pointer'
								onClick={() => handleSelectImage(image)}>
								<img
									src={image.urls.regular}
									alt={image.alt_description}
									style={{ width: '49px', height: '50px' }}
									className='rounded-lg'
								/>
							</div>
						))}
					</div>
				</div>
			</LabelPopup>
		</div>
	);
};
