import { useState } from 'react';
import { LabelElement } from '../..';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';
import { CardStateProps } from '../../../interfaces/ListTaskCardTypes';
import { useProvider } from '../../../hooks';
import clientAxios from '../../../config/clientAxios';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
	onInputChange: (event: any) => void;
}

interface PropsEvent {
	EventElement: HTMLInputElement | HTMLTextAreaElement;
}

export const SectionDescription = ({ formState, setFormState, onInputChange }: Props) => {
	const [isActiveDesc, setIsActiveDesc] = useState(true);
	const { cardUpdate, lists, setLists } = useProvider();

	const handleEditDescription = async () => {
		if (formState.description === cardUpdate.description) {
			return;
		} else {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				description: formState.description,
			});

			const listUpdate = { ...lists };
			const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = { ...column };

			const formStateUpdate = { ...formState };
			formStateUpdate.description = data.description;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		}
	};

	return (
		<div className='input-description-card'>
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
					handleFunction={() => setIsActiveDesc(!isActiveDesc)}
					classname='border-solid border-neutral-700 border-2 mx-3'>
					<IoPencilSharp className='text-white' />
				</LabelElement>
			</div>

			<textarea
				className='w-full p-2 mt-3 bg-transparent text-white'
				placeholder='Write a description...'
				name='description'
				value={formState?.description}
				onChange={onInputChange}
				onBlur={handleEditDescription}
				disabled={isActiveDesc}></textarea>
		</div>
	);
};
