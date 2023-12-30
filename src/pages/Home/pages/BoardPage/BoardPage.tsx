import { FormCardProvider } from '@context/';
import { Board } from '@pages/Home/views/';
import { ModalCreateCard, ModalFormList, ModalFormCard } from '@pages/Home/components';
import { useBoardProvider, useToggle } from '@hooks/';
import { Spinner } from '@components/';
import './BoardPage.css';

export const BoardPage = (): JSX.Element => {
	const [isOpenFormList, onOpenFormList] = useToggle();
	const [isOpenFormCreateCard, onOpenFormCreateCard] = useToggle();
	const [isOpenFormCard, onOpenFormCard] = useToggle();
	const { loading, cardUpdate, isLoadingLists } = useBoardProvider();
	const [isOpen, onOpen] = useToggle();

	return (
		<div className='flex flex-1'>
			{/* <div className='flex flex-col flex-1'> */}
			<main className='relative grow overflow-hidden'>
				{isLoadingLists ? (
					<Spinner className='h-full' />
				) : (
					<>
						<Board
							onOpenFormCreateCard={onOpenFormCreateCard}
							setIsShowModalFormCard={onOpenFormCard}
							setIsShowModalFormList={onOpenFormList}
						/>

						<ModalFormList
							isOpenFormList={isOpenFormList}
							onOpenFormList={onOpenFormList}
						/>

						<ModalCreateCard
							isOpenFormCreateCard={isOpenFormCreateCard}
							onOpenFormCreateCard={onOpenFormCreateCard}
						/>

						<FormCardProvider cardUpdateState={cardUpdate}>
							<ModalFormCard
								isOpenFormCard={isOpenFormCard}
								onOpenFormCard={onOpenFormCard}
							/>
						</FormCardProvider>
					</>
				)}
			</main>
		</div>
	);
};
