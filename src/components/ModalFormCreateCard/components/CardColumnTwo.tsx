import { memo } from 'react';
import { LabelPopup, SectionCovers, SectionLabels } from './';
import { ImageProfile } from '../..';
import { IoAddOutline, IoPeopleSharp, IoPersonCircleOutline, IoSearch } from 'react-icons/io5';
import Image from '../../../assets/PerfilImage.png';
import clientAxios from '../../../config/clientAxios';
import { CardStateProps } from '../../../interfaces/ListTaskCardTypes';
import { SectionMembers } from './SectionMembers/SectionMembers';
import { useProvider } from '../../../hooks';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<any>;
	setIsShowModalCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardColumnTwo = memo(({ formState, setFormState, setIsShowModalCard }: Props) => {
	const { cardUpdate, lists, setLists } = useProvider();

	const handleDeleteCard = async () => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.delete(`/taskCard/${formState._id}`);

			const taskCardUpdate = newColumn.taskCards.filter((taskCard: any) => taskCard._id !== formState._id);
			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);

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
