import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormCardProvider } from '@context/';
import { useBoardProvider, useProvider } from '@hooks/';
import { Spinner, ModalClassic } from '@components/';
import { Board } from '@pages/Home/views/';
import { ModalCreateCard, ModalFormList, ModalFormCard } from '@pages/Home/components';
import './BoardPage.css';

export const BoardPage = (): JSX.Element => {
	const [isShowModalFormList, setIsShowModalFormList] = useState(false);
	const [isShowModalCreateCard, setIsShowModalCreateCard] = useState(false);
	const [isShowModalFormCard, setIsShowModalFormCard] = useState(false);
	const { fetchProject } = useProvider();
	const { loading } = useBoardProvider();
	const { id } = useParams();

	useEffect(() => {
		const controller = new AbortController();
		fetchProject(controller, id);

		return () => {
			controller.abort();
		};
	}, [id]);

	return (
		<div className='flex flex-col flex-1'>
			<main className='relative grow'>
				{loading ? (
					<Spinner className='h-28' />
				) : (
					<>
						<Board
							setIsShowModalCreateCard={setIsShowModalCreateCard}
							setIsShowModalFormCard={setIsShowModalFormCard}
							setIsShowModalFormList={setIsShowModalFormList}
						/>

						<ModalClassic isShow={isShowModalFormList}>
							<ModalFormList setIsShowModalFormList={setIsShowModalFormList} />
						</ModalClassic>

						<ModalClassic isShow={isShowModalCreateCard}>
							<ModalCreateCard setIsShowModalCreateCard={setIsShowModalCreateCard} />
						</ModalClassic>

						<ModalClassic isShow={isShowModalFormCard}>
							<FormCardProvider>
								<ModalFormCard setIsShowModalFormCard={setIsShowModalFormCard} />
							</FormCardProvider>
						</ModalClassic>
					</>
				)}
			</main>
		</div>
	);
};
