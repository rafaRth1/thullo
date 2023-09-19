import { useState } from 'react';
import { useFormCardProvider } from '@hooks/';
import { useEditTaskCardMutation } from '@redux/home/apis';

export const SectionNameCard = () => {
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const [name, setName] = useState<string>(cardUpdate.nameCard);
	const [editTaskCard] = useEditTaskCardMutation();

	const handleEditNameCard = async () => {
		if (name === cardUpdate.nameCard || name.length <= 1) {
			return;
		}

		await editTaskCard({ idTaskCard: cardUpdate._id, nameCard: name });
		setCardUpdate({ ...cardUpdate, nameCard: name });
	};

	return (
		<>
			<div className='mb-5 flex items-center'>
				<input
					type='text'
					placeholder='Name card example'
					name='nameCard'
					value={name}
					onChange={(e) => setName(e.target.value)}
					onBlur={handleEditNameCard}
					className='bg-transparent focus-visible:outline-0 flex-1 w-full text-white'
				/>
			</div>
		</>
	);
};
