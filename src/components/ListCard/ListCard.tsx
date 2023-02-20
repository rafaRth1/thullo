import { useState, useEffect, memo } from 'react';
import { useProvider } from '../../hooks';
import { AddElementLabel, Card, ModalFormCreateCard, ModalRename } from '../';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import clientAxios from '../../config/clientAxios';
import { CardUpdateProps } from './types/CardUpdateProps';

interface Props {
	list: any;
	isDragging: boolean;
	handleDragging: (dragging: boolean) => void;
}

export const ListCard = memo(({ list, isDragging, handleDragging }: Props): JSX.Element => {
	const [cards, setCards] = useState<any[]>(list.taskCards);
	const [modalRename, setModalRename] = useState(false);
	const [isShowModalCard, setIsShowModalCard] = useState(false);
	const [showMenuList, setShowMenuList] = useState(false);
	const { lists, setLists, handleUpdateList, setOverflow, setAlertHigh } = useProvider();
	const [cardUpdate, setCardUpdate] = useState<CardUpdateProps>({
		id: '',
		nameCard: '',
		attachments: [],
		comments: [],
		description: '',
		imgUlr: '',
		labels: [],
	});

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		const idCard = e.dataTransfer.getData('text');
		handleUpdateList(idCard, list._id);
		handleDragging(false);
	};

	const handleEditCard = (card: any) => {
		setIsShowModalCard(true);
		setCardUpdate(card);
	};

	const handleDeleteList = async () => {
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const { data } = await clientAxios.delete(`/list/${list._id}`, config);
			const listUpdated = lists.filter((listState) => listState._id !== list._id);
			setLists(listUpdated);

			setAlertHigh({
				msg: data.msg,
				error: false,
			});

			setTimeout(() => {
				setAlertHigh({
					msg: '',
					error: false,
				});
			}, 3000);
		} catch (error: any) {
			setAlertHigh({
				msg: error.data.response.msg,
				error: true,
			});

			setTimeout(() => {
				setAlertHigh({
					msg: '',
					error: false,
				});
			}, 3000);
		}
	};

	const handleEditList = () => {
		setOverflow(true);
		setModalRename(true);
	};

	// useEffect(() => {
	// 	const getCards = async () => {
	// 		try {
	// 			const { data } = await clientAxios(`/taskCard/${list._id}`);
	// 			setCards(data.taskCards);
	// 		} catch (error) {
	// 			setAlertHigh({
	// 				msg: 'Error al obtener Tareas',
	// 				error: true,
	// 			});

	// 			setTimeout(() => {
	// 				setAlertHigh({
	// 					msg: '',
	// 					error: false,
	// 				});
	// 			}, 2000);
	// 		}
	// 	};

	// 	getCards();
	// }, []);

	useEffect(() => {
		setCards(list.taskCards);
	}, [lists]);

	return (
		<div
			className='contenedor-list relative'
			onDrop={onDrop}
			onDragOver={handleDragOver}>
			<div className='content-list max-h-full flex flex-col'>
				<div className='header-list mb-5 flex justify-between items-center cursor-pointer'>
					<span className='flex-1 text-white'>{list.name}</span>

					<div className='relative'>
						<div>
							<IoEllipsisHorizontalSharp
								className='text-white'
								onClick={() => setShowMenuList(!showMenuList)}
							/>
						</div>

						<div
							className={`flex flex-col absolute left-0 z-40 w-32 bg-neutral-700 rounded transition-opacity ${
								showMenuList ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
							}`}>
							<span
								className='text-yellow-500 hover:text-yellow-600 text-md p-2'
								onClick={handleEditList}>
								Rename
							</span>

							<span className='w-10/12 h-px bg-neutral-500 block mx-2'></span>
							<span
								className='text-red-500 hover:text-red-600 text-md p-2'
								onClick={handleDeleteList}>
								Delete this list
							</span>
						</div>
					</div>
				</div>

				<div className='cards flex-1'>
					{cards.map((card: any) => (
						<Card
							key={card._id}
							card={card}
							isDragging={isDragging}
							handleDragging={handleDragging}
							handleEditCard={handleEditCard}
						/>
					))}
				</div>

				<div className='mt-5'>
					<AddElementLabel
						text='Add Another Card'
						handleDispatch={() => {
							setIsShowModalCard(!isShowModalCard),
								setOverflow(true),
								setCardUpdate({
									id: '',
									nameCard: '',
									attachments: [],
									comments: [],
									description: '',
									imgUlr: '',
									labels: [],
								});
						}}
					/>
				</div>

				<ModalFormCreateCard
					idList={list._id}
					list={list}
					isShowModalCard={isShowModalCard}
					setIsShowModalCard={setIsShowModalCard}
					cardUpdate={cardUpdate}
					cards={cards}
					setCards={setCards}
				/>

				<ModalRename
					modalRename={modalRename}
					setModalRename={setModalRename}
					list={list}
					setShowMenuList={setShowMenuList}
				/>
			</div>
		</div>
	);
});
