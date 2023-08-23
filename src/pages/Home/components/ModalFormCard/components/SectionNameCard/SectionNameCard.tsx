import { useState, useEffect } from 'react';
import { useProvider } from '@hooks/useProvider';
import { useAppDispatch } from '@hooks/useRedux';
import { editCardThunk } from '@redux/home/slices/listsSlice';

export const SectionNameCard = () => {
	const [name, setName] = useState('');
	const { cardUpdate } = useProvider();
	const dispatch = useAppDispatch();

	const handleEditNameCard = async () => {
		if (name === cardUpdate.nameCard) {
			return;
		}

		dispatch(editCardThunk(name, cardUpdate.list, cardUpdate._id));
	};

	useEffect(() => {
		setName(cardUpdate.nameCard);

		return () => {
			setName('');
		};
	}, []);

	return (
		<div className='mb-5 flex items-center'>
			<input
				type='text'
				placeholder='Name card example'
				name='nameCard'
				value={name}
				onChange={(e) => setName(e.target.value)}
				onBlur={handleEditNameCard}
				className='bg-transparent focus-visible:outline-0 flex-1 w-full text-white'
			/>
		</div>
	);
};
