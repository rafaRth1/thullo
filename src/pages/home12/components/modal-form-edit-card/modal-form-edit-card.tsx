import { OverlayImage } from '@components/';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useFormCardProvider } from '@hooks/';
import { CardColumnOne, CardColumnTwo } from './components';

interface Props {
	isOpenFormEditCard: boolean;
	onOpenChangeEditFormCard: () => void;
}

export const ModalFormEditCard = ({ isOpenFormEditCard, onOpenChangeEditFormCard }: Props): JSX.Element => {
	const { cardUpdate } = useFormCardProvider();

	return cardUpdate._id ? (
		<Modal
			size='3xl'
			isOpen={isOpenFormEditCard}
			onOpenChange={onOpenChangeEditFormCard}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader></ModalHeader>
						<ModalBody>
							{cardUpdate.imgUlr && (
								<div className='relative w-full rounded-xl mb-3 h-[130px]'>
									<OverlayImage
										src={cardUpdate.imgUlr}
										alt='Image Card'
										className='w-full h-full object-cover'
									/>
								</div>
							)}

							<div className='flex flex-col-reverse md:flex-row'>
								<CardColumnOne />
								<CardColumnTwo onOpenChangeEditFormCard={onOpenChangeEditFormCard} />
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	) : (
		<></>
	);
};

// 	<ModalContent size='sm:max-w-xl md:max-w-3xl'>
