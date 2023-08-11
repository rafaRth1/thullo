import { useState } from 'react';
import { useProvider } from '../../../../hooks';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface Props {
	setIsShowModalCreateCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalCreateCard = ({ setIsShowModalCreateCard }: Props) => {
	const [nameCard, setNameCard] = useState('');
	const { submitCard } = useProvider();

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur-md transition-opacity z-50'>
			<div className='z-30'>
				<form
					onSubmit={(e) => {
						e.preventDefault();

						submitCard({
							nameCard,
							attachments: [],
							comments: [],
							description: '',
							imgUlr: '',
							labels: [],
							members: [],
						});
					}}
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
