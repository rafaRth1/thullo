import { Modal, OverlayImage, Spinner } from '@components/';
import { ModalBody, ModalContent, ModalHeader } from '@components/Modal';
import { useFormCardProvider } from '@hooks/';
import { CardColumnOne, CardColumnTwo, SectionNameCard } from './components';
import './ModalFormCard.css';

export const ModalFormCard = ({
	isOpenFormCard,
	onOpenFormCard,
}: {
	isOpenFormCard: boolean;
	onOpenFormCard: () => void;
}): JSX.Element => {
	const { cardUpdate } = useFormCardProvider();

	return cardUpdate._id ? (
		<Modal
			show={isOpenFormCard}
			onOpenChange={onOpenFormCard}>
			<ModalContent size='sm:max-w-xl md:max-w-3xl'>
				{(onOpenChange) => (
					<>
						<ModalHeader>
							<></>
						</ModalHeader>

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
								<CardColumnTwo onOpenFormCard={onOpenChange} />
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
