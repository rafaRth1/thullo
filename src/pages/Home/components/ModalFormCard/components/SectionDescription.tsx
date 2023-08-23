import { useState, useEffect } from 'react';
import { LabelElement } from '@components/';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { editDesciptionTaskCardThunk } from '@redux/home/slices/listsSlice';
import { useProvider } from '@hooks/useProvider';

export const SectionDescription = () => {
	const [description, setDescription] = useState('');
	const { cardUpdate } = useProvider();
	const dispatch = useAppDispatch();
	const { lists } = useAppSelector((state) => state.lists);

	const handleEditDescription = () => {
		if (description === cardUpdate.description) {
			return;
		}

		setDescription(description);
		dispatch(editDesciptionTaskCardThunk(description, cardUpdate.list, cardUpdate._id));
	};

	useEffect(() => {
		setDescription(cardUpdate.description);

		return () => {
			setDescription('');
		};
	}, []);

	return (
		<div className='description-card-content'>
			<div className='header-description flex mt-5'>
				<div className='flex items-center text-neutral-500 text-sm'>
					<IoDocumentTextOutline
						size={17}
						className='mr-3'
					/>
					<span>Description</span>
				</div>

				<LabelElement
					label='Edit'
					classname='border-solid border-neutral-700 border-2 mx-3'>
					<IoPencilSharp className='text-white' />
				</LabelElement>
			</div>

			<textarea
				className='w-full p-2 mt-3 bg-transparent text-white'
				placeholder='Write a description...'
				name='description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				onBlur={handleEditDescription}
			/>
		</div>
	);
};
