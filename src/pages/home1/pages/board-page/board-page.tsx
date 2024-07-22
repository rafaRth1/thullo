import { FormCardProvider } from '@context/';
import { useDisclosure } from '@nextui-org/react';
import { Board } from '@pages/home/views';
import { ModalFormCard, ModalFormList, ModalFormEditCard } from '@pages/home/components';
import { useBoardProvider } from '@hooks/';
import { Spinner } from '@components/';

export const BoardPage = (): JSX.Element => {
	const { isOpen: isOpenFormList, onOpen: onOpenFormList, onOpenChange: onOpenChangeFormList } = useDisclosure();
	const modalFormCard = useDisclosure();
	const { isOpen: isOpenFormEditCard, onOpen: onOpenFormEditCard, onOpenChange: onOpenChangeEditFormCard } = useDisclosure();
	const { loading, cardUpdate, isLoadingLists } = useBoardProvider();

	return (
		<div className='flex flex-1'>
			{/* <div className='flex flex-col flex-1'> */}
			<main className='relative grow overflow-hidden'>
				{isLoadingLists ? (
					<Spinner className='h-full' />
				) : (
					<>
						<Board
							onOpenFormList={onOpenFormList}
							onOpenFormCard={modalFormCard.onOpen}
							onOpenFormEditCard={onOpenFormEditCard}
						/>

						<ModalFormList
							isOpenFormList={isOpenFormList}
							onOpenChangeFormList={onOpenChangeFormList}
						/>

						<ModalFormCard
							isOpenFormCard={modalFormCard.isOpen}
							onOpenChangeFormCard={modalFormCard.onOpenChange}
						/>

						<FormCardProvider cardUpdateState={cardUpdate}>
							<ModalFormEditCard
								isOpenFormEditCard={isOpenFormEditCard}
								onOpenChangeEditFormCard={onOpenChangeEditFormCard}
							/>
						</FormCardProvider>
					</>
				)}
			</main>
		</div>
	);
};
