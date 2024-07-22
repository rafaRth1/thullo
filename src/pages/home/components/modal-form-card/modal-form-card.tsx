import { useState } from 'react';
import { useAddTaskCardMutation } from '@redux/home/apis';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useBoardProvider } from '@hooks/';
import { TaskCardTypes } from '@interfaces/';

interface Props {
	isOpenFormCard: boolean;
	onOpenChangeFormCard: () => void;
}

export const ModalFormCard = ({ isOpenFormCard, onOpenChangeFormCard }: Props) => {
	const [nameCard, setNameCard] = useState('');
	const { listCurrent } = useBoardProvider();
	const [addTaskCard] = useAddTaskCardMutation();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
		onOpenChangeFormCard();
	};

	return (
		<Modal
			isOpen={isOpenFormCard}
			onOpenChange={onOpenChangeFormCard}
			className='bg-neutral-900'>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>Formulario tarjeta</ModalHeader>
						<ModalBody>
							<form
								onSubmit={(e) => onSubmit(e)}
								className='flex flex-col'>
								<Input
									type='text'
									name='name-card'
									label='Nombre de la tarjeta'
									className='mb-5'
									value={nameCard}
									onValueChange={setNameCard}
								/>

								<Button
									color='primary'
									type='submit'>
									Crear Tarjeta
								</Button>
							</form>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
