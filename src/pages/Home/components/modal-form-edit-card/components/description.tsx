import { useState } from 'react';
import { useFormCardProvider } from '@hooks/';
import { useEditDescriptionTaskCardMutation } from '@redux/home/apis';
import { Textarea } from '@nextui-org/react';

export const Description = () => {
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
		<div className='mb-4'>
			<Textarea
				label='Descripción'
				placeholder='Ingresar descripción'
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
