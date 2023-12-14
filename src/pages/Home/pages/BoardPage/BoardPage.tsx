import { useState, useEffect } from 'react';
import { FormCardProvider } from '@context/';
import { useBoardProvider, useToggle } from '@hooks/';
import { Modal, Spinner } from '@components/';
import { Board } from '@pages/Home/views/';
import { ModalCreateCard, ModalFormList, ModalFormCard } from '@pages/Home/components';
import './BoardPage.css';

export const BoardPage = (): JSX.Element => {
	const [isOpenFormList, onOpenFormList] = useToggle();
	const [isOpenFormCreateCard, onOpenFormCreateCard] = useToggle();
	const [isOpenFormCard, onOpenFormCard] = useToggle();
	const { loading, cardUpdate } = useBoardProvider();
	const [isOpen, onOpen] = useToggle();

	return (
		<div className='flex flex-1'>
			{/* <div className='flex flex-col flex-1'> */}
			<main className='relative grow overflow-hidden'>
				{loading ? (
					<Spinner className='h-28' />
				) : (
					<>
						<Board
							onOpenFormCreateCard={onOpenFormCreateCard}
							setIsShowModalFormCard={onOpenFormCard}
							setIsShowModalFormList={onOpenFormList}
						/>

						<Modal
							show={isOpenFormList}
							onOpenChange={onOpenFormList}>
							<ModalFormList />
						</Modal>

						<Modal
							show={isOpenFormCreateCard}
							onOpenChange={onOpenFormCreateCard}>
							<ModalCreateCard />
						</Modal>
						
						<Modal
							show={isOpenFormCard}
							onOpenChange={onOpenFormCard}>
							<FormCardProvider cardUpdateState={cardUpdate}>
								<ModalFormCard />
							</FormCardProvider>
						</Modal>
					</>
				)}
			</main>
		</div>
	);
};
