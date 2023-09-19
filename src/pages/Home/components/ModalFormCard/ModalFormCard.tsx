import { OverlayImage, Spinner } from '@components/';
import { ModalBody, ModalContent, ModalHeader } from '@components/Modal';
import { useFormCardProvider } from '@hooks/';
import { CardColumnOne, CardColumnTwo } from './components';
import './ModalFormCard.css';

export const ModalFormCard = (): JSX.Element => {
	const { cardUpdate } = useFormCardProvider();

	return cardUpdate._id ? (
		<ModalContent>
			{(onOpenChange) => (
				<>
					<ModalHeader>
						<></>
					</ModalHeader>

					<ModalBody>
						<div>
							<form className='modal-form-create-card-content relative'>
								{cardUpdate.imgUlr && (
									<div className='relative w-full rounded-xl mb-3 h-[130px]'>
										<OverlayImage
											src={cardUpdate.imgUlr}
											alt='Image Card'
											className='w-full h-full object-cover'
										/>
									</div>
								)}

								<div className='flex'>
									<CardColumnOne />
									<CardColumnTwo onOpenFormCard={onOpenChange} />
								</div>
							</form>
						</div>
					</ModalBody>
				</>
			)}
		</ModalContent>
	) : (
		<></>
	);
};
