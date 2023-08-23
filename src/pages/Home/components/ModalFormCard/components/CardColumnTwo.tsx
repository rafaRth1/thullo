import { useProvider } from '@hooks/useProvider';
import { useAppDispatch } from '@hooks/useRedux';
import { deleteCardThunk } from '@redux/home/slices/listsSlice';
import { SectionCovers, SectionLabels, SectionMembers } from './';
import { IoPersonCircleOutline } from 'react-icons/io5';

interface Props {
	setIsShowModalFormCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardColumnTwo = ({ setIsShowModalFormCard }: Props) => {
	const { cardUpdate } = useProvider();
	const dispatch = useAppDispatch();

	const handleDeleteCard = async () => {
		const alertValue = confirm('Are you sure you want to delete?');

		if (!alertValue) {
			return;
		}

		await dispatch(deleteCardThunk(cardUpdate._id, cardUpdate.list));

		setIsShowModalFormCard(false);
	};

	return (
		<div className='card-column-two flex-1'>
			<div className='flex items-center text-neutral-500 text-sm self-end'>
				<IoPersonCircleOutline
					size={17}
					className='mr-3'
				/>
				<span>Actions</span>
			</div>

			<div className='actions-labels'>
				<SectionLabels />
				<SectionCovers />
				<SectionMembers />

				<div
					className='bg-red-600 hover:bg-red-700 transition-colors rounded p-1 text-center cursor-pointer mt-2'
					onClick={handleDeleteCard}>
					<span className='text-white text-sm'>Delete Card</span>
				</div>
			</div>
		</div>
	);
};
