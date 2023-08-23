import { useState } from 'react';
import { useAppDispatch, useProvider } from '@hooks/';
import { addCardThunk } from '@redux/home/slices/listsSlice';
import { CardStateProps } from '@interfaces/';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface Props {
	setIsShowModalCreateCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateCard = ({ setIsShowModalCreateCard }: Props) => {
	const [nameCard, setNameCard] = useState('');
	const { listCurrent } = useProvider();
	const dispatch = useAppDispatch();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const card: CardStateProps = {
			nameCard,
			description: '',
			imgUlr: '',
			comments: [],
			attachments: [],
			labels: [],
			members: [],
			list: listCurrent._id,
		};

		await dispatch(addCardThunk(card, listCurrent));

		setIsShowModalCreateCard(false);
	};

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur-md transition-opacity z-50'>
			<div className='z-30'>
				<form
					onSubmit={onSubmit}
					className='flex flex-col w-80'>
					<input
						type='text'
						name='name-card'
						placeholder='Add Card'
						className='bg-neutral-600 text-white outline-none rounded-xl mb-5 p-3'
						value={nameCard}
						onChange={(e) => setNameCard(e.target.value)}
					/>

					<button
						type='submit'
						className='text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-2'>
						Create Card
					</button>
				</form>

				<div
					className='cursor-pointer absolute top-12 right-12'
					onClick={() => setIsShowModalCreateCard(false)}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full z-20'
				onClick={() => setIsShowModalCreateCard(false)}
			/>
		</div>
	);
};
