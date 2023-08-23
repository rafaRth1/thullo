import { useProvider } from '@hooks/';
import { OverlayImage } from '@components/';
import { CardColumnOne, CardColumnTwo } from './components';
import { ListTypes } from '@interfaces/';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormCard.css';

interface Props {
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalFormCard = ({ setIsShowModalFormCard }: Props): JSX.Element => {
	const { cardUpdate, setListCurrent } = useProvider();

	const closeModal = () => {
		setIsShowModalFormCard(false);
		// setListCurrent({} as ListTypes);
	};

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			<form className='modal-form-create-card-content relative p-5 bg-neutral-800 rounded-lg'>
				<div
					className='close-modal-form-card absolute right-2 top-3 z-30 cursor-pointer'
					onClick={closeModal}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>

				{cardUpdate.imgUlr && (
					<div className='relative w-full rounded-xl mb-3 h-[130px]'>
						<OverlayImage
							src={cardUpdate.imgUlr}
							alt='Image Card'
							className='w-full h-full object-cover'
						/>
					</div>
				)}

				<div className='flex'>
					<CardColumnOne />
					<CardColumnTwo setIsShowModalFormCard={setIsShowModalFormCard} />
				</div>
			</form>
		</div>
	);
};
