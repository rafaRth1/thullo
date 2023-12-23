import { useState } from 'react';
import { LabelElement } from '@components/';
import { useFormCardProvider } from '@hooks/';
import { useEditDescriptionTaskCardMutation } from '@redux/home/apis';
import { IoDocumentTextOutline, IoPencilSharp } from 'react-icons/io5';

export const SectionDescription = () => {
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const [description, setDescription] = useState<string>(cardUpdate.description);
	const [editDescriptionTaskCard] = useEditDescriptionTaskCardMutation();

	const handleEditDescription = async () => {
		if (description === cardUpdate.description) {
			return;
		}

		try {
			await editDescriptionTaskCard({ idTaskCard: cardUpdate._id, description });
			setCardUpdate({ ...cardUpdate, description });
		} catch (error) {
			// FIX: Add handle message error
			console.log(error, 'Section Description');
		}
	};

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
				className='border-neutral-700 focus-visible:border-neutral-500 text-white bg-neutral-800 focus-visible:outline-none border-2 rounded-xl w-full p-3 mt-3'
				placeholder='Write a description...'
				name='description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				onBlur={handleEditDescription}
			/>
		</div>
	);
};

// const listsUdpate = lists.map((list) => {
// 	if (list._id === cardUpdate.list) {
// 		return {
// 			...list,
// 			taskCards: list.taskCards.map((taskCard) => {
// 				if (taskCard._id === cardUpdate._id) {
// 					return {
// 						...taskCard,
// 						description: data.description,
// 					};
// 				}

// 				return taskCard;
// 			}),
// 		};
// 	}

// 	return list;
// });
