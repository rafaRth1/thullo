import { useState } from 'react';
import { LabelPopup } from './';
import { IoImage, IoSearch } from 'react-icons/io5';
import clientAxios from '../../../config/clientAxios';
import { CardStateProps } from '../../../interfaces/ListTaskCardTypes';
import { useProvider } from '../../../hooks';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
}

export const SectionCovers = ({ formState, setFormState }: Props): JSX.Element => {
	const [valueSearch, setValueSearch] = useState<string>('');
	const [images, setImages] = useState<any[]>([]);
	const { cardUpdate, lists, setLists } = useProvider();

	const handleSearchImage = async () => {
		if (valueSearch.length <= 2) {
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

	const handleSelectImage = async (image: any) => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: image.urls.regular,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteImage = async () => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: '',
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='mt-2'>
			<LabelPopup
				nameLabel='Covers'
				IconLabel={IoImage}>
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
							type='button'
							className='bg-blue-600 p-2 rounded absolute right-0'
							onClick={handleSearchImage}>
							<IoSearch className='text-white text-sm' />
						</button>
					</div>

					<div className='delete-image'>
						<button
							type='button'
							className='text-white text-sm text-center w-full p-1 rounded bg-red-600 hover:bg-red-700'
							onClick={handleDeleteImage}>
							Eliminar Imagen
						</button>
					</div>

					<div className='result-images flex flex-wrap'>
						{images.map((image) => (
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
