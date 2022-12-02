import { useState } from 'react';
import { AddElementLabel, ModalFormCreateCard } from '../';
import { Card } from './Components/Card/Card';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

export const ListCard = ({ lists, setLists, isDragging, handleDragging, handleUpdateList, list }: any) => {
	const [cardUpdate, setCardUpdate] = useState({
		id: 0,
		name_card: '',
		attachments: [],
		comments: [],
		description: '',
		url_image: '',
	});
	const [isShowModalCard, setIsShowModalCard] = useState(false);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		const idCard = +e.dataTransfer.getData('text');
		handleUpdateList(idCard, list.id);
		handleDragging(false);
	};

	const handleEditCard = (card: any) => {
		setCardUpdate(card);
		setIsShowModalCard(true);
	};

	return (
		<div
			className={`contenedor-list relative`}
			onDrop={onDrop}
			onDragOver={handleDragOver}>
			<div className='header-list flex justify-between items-center cursor-pointer'>
				<span className='flex-1'>{list.nameList}</span>
				<IoEllipsisHorizontalSharp />
			</div>

			{list.cards.map((card: any, index: number) => (
				<Card
					key={card.id}
					handleDragging={handleDragging}
					card={card}
					isDragging={isDragging}
					handleEditCard={handleEditCard}
				/>
			))}

			<div className='mt-5'>
				<AddElementLabel
					text='Add Another Card'
					handleDispatch={() => setIsShowModalCard(!isShowModalCard)}
				/>
			</div>

			<ModalFormCreateCard
				isShowModalCard={isShowModalCard}
				setIsShowModalCard={setIsShowModalCard}
				idList={list.id}
				list={list}
				lists={lists}
				setLists={setLists}
				cardUpdate={cardUpdate}
			/>
		</div>
	);
};
