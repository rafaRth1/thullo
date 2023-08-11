import { useContext } from 'react';
import { useProvider } from '@hooks/';
import { FormCardContext } from '@context/';
import { OverlayImage } from '@components/';
import { CardColumnOne, CardColumnTwo } from './components';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormCard.css';

interface Props {
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalFormCard = ({ setIsShowModalFormCard }: Props): JSX.Element => {
	const { formState } = useContext(FormCardContext);
	const { submitCard, setListCurrent } = useProvider();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await submitCard({
			_id: formState._id,
			nameCard: formState.nameCard,
			imgUlr: formState.imgUlr,
			description: formState.description,
			members: formState.members,
			labels: formState.labels,
			comments: formState.comments,
			attachments: formState.attachments,
			list: formState.list,
		});
	};

	const closeModal = () => {
		setIsShowModalFormCard(false);
		setListCurrent('');
	};

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			<form
				className='modal-form-create-card-content relative p-5 bg-neutral-800 rounded-lg'
				onSubmit={(e) => handleSubmit(e)}>
				<div
					className='close-modal-form-card absolute right-2 top-3 z-30 cursor-pointer'
					onClick={closeModal}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>

				{formState.imgUlr && (
					<div className='relative w-full rounded-xl mb-3 h-[130px]'>
						<OverlayImage
							src={formState.imgUlr}
							alt='Image Card'
							className='w-full h-full object-cover'
						/>
					</div>
				)}

				<div className='flex'>
					<CardColumnOne />
					<CardColumnTwo />
				</div>

				{!formState?._id ? (
					<input
						type='submit'
						className='bg-blue-600 block py-1 mx-auto my-1 w-32 rounded-xl text-sm text-white cursor-pointer'
						value='Crear'
					/>
				) : null}
			</form>
		</div>
	);
};
