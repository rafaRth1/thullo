import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@components/Modal';
import { useBoardProvider } from '@hooks/';
import { TaskCardTypes } from '@interfaces/';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useAddTaskCardMutation } from '@redux/home/apis';

export const ModalCreateCard = () => {
	const [nameCard, setNameCard] = useState('');
	const { listCurrent } = useBoardProvider();
	const [addTaskCard] = useAddTaskCardMutation();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>, onOpenChange: () => void) => {
		e.preventDefault();

		const card: TaskCardTypes = {
			nameCard,
			description: '',
			imgUlr: '',
			comments: [],
			attachments: [],
			labels: [],
			members: [],
			list: listCurrent._id,
		};

		await addTaskCard({ card });
		onOpenChange();
	};

	return (
		<ModalContent>
			{(onOpenChange) => (
				<>
					<ModalHeader className='text-white'>Form Create Card</ModalHeader>
					<ModalBody>
						<form
							onSubmit={(e) => onSubmit(e, onOpenChange)}
							className='flex flex-col w-80'>
							<input
								type='text'
								name='name-card'
								placeholder='Add Card'
								className='bg-neutral-600 text-white outline-none rounded-xl mb-5 p-3'
								value={nameCard}
								onChange={(e) => setNameCard(e.target.value)}
							/>

							<button
								type='submit'
								className='text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-2'>
								Create Card
							</button>
						</form>
					</ModalBody>
				</>
			)}
		</ModalContent>
	);
};
