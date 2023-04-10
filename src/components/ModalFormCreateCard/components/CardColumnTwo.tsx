import { memo } from 'react';
import { LabelPopup, SectionCovers, SectionLabels } from './';
import { ImageProfile } from '../..';
import { IoAddOutline, IoPeopleSharp, IoPersonCircleOutline, IoSearch } from 'react-icons/io5';
import Image from '../../../assets/PerfilImage.png';
import clientAxios from '../../../config/clientAxios';
import { CardStateProps } from '../../ListTaskCard/ListTaskCardTypes';
import { SectionMembers } from './SectionMembers/SectionMembers';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<any>;
	setIsShowModalCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardColumnTwo = memo(({ formState, setFormState, setIsShowModalCard }: Props) => {
	const handleDeleteCard = async () => {
		try {
			const { data } = await clientAxios.delete(`/taskCard/${formState._id}`);
			// setCards((cardsPrev: any) => cardsPrev.filter((card: any) => card._id !== formState._id));
			setIsShowModalCard(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='flex items-center text-neutral-500 text-sm self-end'>
				<IoPersonCircleOutline
					size={17}
					className='mr-3'
				/>
				<span>Actions</span>
			</div>

			<div className='actions-labels'>
				<SectionLabels
					formState={formState}
					setFormState={setFormState}
				/>

				<SectionCovers
					formState={formState}
					setFormState={setFormState}
				/>

				<SectionMembers
					formState={formState}
					setFormState={setFormState}
				/>

				{!!formState?._id && (
					<div
						className='bg-red-600 hover:bg-red-700 transition-colors rounded p-1 text-center cursor-pointer mt-2'
						onClick={handleDeleteCard}>
						<span className='text-white text-sm'>Delete Card</span>
					</div>
				)}
			</div>
		</>
	);
});
