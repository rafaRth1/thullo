import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { useFormCardProvider } from '@hooks/';
import { useEditTaskCardMutation } from '@redux/home/apis';

export const NameCard = () => {
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const [name, setName] = useState(cardUpdate.nameCard);
	const [editTaskCard] = useEditTaskCardMutation();

	const handleEditNameCard = async () => {
		if (name === cardUpdate.nameCard || name.length <= 1) {
			return;
		}

		await editTaskCard({ idTaskCard: cardUpdate._id, nameCard: name });
		setCardUpdate({ ...cardUpdate, nameCard: name });
	};

	return (
		<div className='mb-4'>
			<Input
				type='text'
				name='name-card'
				label='Titulo'
				value={name}
				onValueChange={setName}
				onBlur={handleEditNameCard}
			/>
		</div>
	);
};
